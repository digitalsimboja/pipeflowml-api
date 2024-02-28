import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { AIAgentResponse, CreateAgentInput } from "../typeDefs/agent";
import { AuthorizedContext } from "../common";
import { AIAgent, AIAgentDomain } from "../../../entities/agent";
import { User, safeFindUserOrFail } from "../../../entities/user";
import { AppDataSource } from "../../../config/datasource";
import { UserAgentDeployment } from "../../../entities/userAgentDeployment";
import { HelpfulInstruction } from "../common";
import { IntegratedTool } from "../../../entities/tool";


@Resolver()
export default class AgentResolver {

    @Mutation(() => AIAgentResponse)
    async createAgent(
        @Arg("data") data: CreateAgentInput,
        @Ctx() ctx: AuthorizedContext): Promise<AIAgentResponse> {
        const user = await safeFindUserOrFail(ctx.userId, ctx, ["agentDeployments"]);

        const newAgent = new AIAgent();
        newAgent.name = data.name;
        newAgent.description = data?.description || "";
        newAgent.model = data.model;
        newAgent.domain = data.domain;
        newAgent.instruction = data?.instruction || HelpfulInstruction;
        newAgent.welcomeMessage = data?.welcomeMessage || "";
        newAgent.tools = data?.tools || [IntegratedTool.EVVELANDAI]
        newAgent.sharableURL = `<h1> Completed successfully by ${ctx.userId}</h1>`


        const agentRepository = AppDataSource.getRepository(AIAgent)
        const savedAgent = await agentRepository.save(newAgent);

        const newUserAgenDeploymnet = new UserAgentDeployment()
        newUserAgenDeploymnet.user = user;
        newUserAgenDeploymnet.agent = savedAgent;

        const userDeploymentsRepository = AppDataSource.getRepository(UserAgentDeployment)
        const newAgentDeployment = await userDeploymentsRepository.save(newUserAgenDeploymnet);

        const userRepository = AppDataSource.getRepository(User)
        user.agentDeployments.push(newAgentDeployment)
        await userRepository.save(user);

        const agentResponse: AIAgentResponse = {
            id: savedAgent.id,
            name: savedAgent.name,
            description: savedAgent.description,
            domain: savedAgent.domain || AIAgentDomain.ASSISTANT,
            sharableURL: `<h1> Completed successfully by ${ctx.userId}</h1>`

        }
        return agentResponse

    }
}