import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { AIAgentResponse, CreateAgentInput, PartialAgentInput } from "../typeDefs/agent";
import { AuthorizedContext } from "../common";
import { Agent, AIAgentDomain } from "../../../entities/agent";
import { User, safeFindUserOrFail } from "../../../entities/user";
import { AppDataSource } from "../../../config/datasource";
import { HelpfulInstruction } from "../common";
import { IntegratedTool } from "../../../entities/tool";


@Resolver()
export default class AgentResolver {

    @Mutation(() => AIAgentResponse)
    async createAgent(
        @Arg("data") data: CreateAgentInput,
        @Ctx() ctx: AuthorizedContext
    ): Promise<AIAgentResponse> {
        try {
            const user = await safeFindUserOrFail(ctx.userId, ctx, ["agents"]);

            const newAgent = new Agent();
            newAgent.name = data.name;
            newAgent.description = data?.description || "";
            newAgent.model = data.model;
            newAgent.domain = data.domain;
            newAgent.instruction = data?.instruction || HelpfulInstruction;
            newAgent.welcomeMessage = data?.welcomeMessage || "";
            newAgent.tools = data?.tools || [IntegratedTool.EVVELANDAI];

            const agentRepository = AppDataSource.getRepository(Agent);
            const savedAgent = await agentRepository.save(newAgent);

            const sharableURL = `http://localhost:8443/${user.id}/agents/${savedAgent.id}`;
            savedAgent.sharableURL = sharableURL;

            // Save the updated agent back to the database
            await agentRepository.save(savedAgent);

            const userRepository = AppDataSource.getRepository(User);
            user.agents.push(savedAgent);
            await userRepository.save(user);

            const agentResponse: AIAgentResponse = {
                id: savedAgent.id,
                name: savedAgent.name,
                description: savedAgent.description,
                domain: savedAgent.domain || AIAgentDomain.ASSISTANT,
                sharableURL: `<h1> Completed successfully by ${ctx.userId}</h1>`
            };

            return agentResponse;
        } catch (error) {
            console.error("Error creating agent:", error);
            throw new Error("Failed to create agent");
        }
    }


    @Mutation(_ => AIAgentResponse)
    async updateAgent(
        @Ctx() ctx: AuthorizedContext,
        @Arg("data") data: PartialAgentInput,
        @Arg("id", _ => String) id: string
    ) {
        try {
            const agentRepository = AppDataSource.getRepository(Agent);
            const agent = await agentRepository.findOne({
                where: { id },
                relations: ["user"]
            });

            if (!agent) {
                throw new Error("Agent you are trying to update does not exist");
            }

            if (agent.user.id !== ctx.userId) {
                throw new Error("Updating an agent can only be done by the owner");
            }

            const partialUpdates = {
                ...(data.name ? { name: data.name } : {}),
                ...(data.description ? { description: data.description } : {}),
                ...(data.domain ? { domain: data.domain } : {}),
                ...(data.instruction ? { instruction: data.instruction } : {}),
                ...(data.welcomeMessage ? { welcomeMessage: data.welcomeMessage } : {}),
                ...(data.tools ? { tools: [...data.tools] } : {})
            };

            await agentRepository.update(id, partialUpdates);

            const updatedAgent = await agentRepository.findOne({
                where: { id }
            })

            return {
                id: updatedAgent?.id!,
                name: updatedAgent?.name,
                description: updatedAgent?.description,
                domain: updatedAgent?.domain,
                instruction: updatedAgent?.instruction,
                welcomeMessage: updatedAgent?.welcomeMessage,
                sharableURL: updatedAgent?.sharableURL,
                tools: updatedAgent?.tools
            }

        } catch (error) {

            console.error("Error updating agent:", error);
            throw new Error("Failed to update agent");
        }
    }



}