import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { AIAgentResponse, CreateAgentInput } from "../typeDefs/agent";
import { AuthorizedContext } from "../common";
import { AIAgent, AIAgentDomain } from "../../../entities/agent";
import { safeFindUserOrFail } from "../../../entities/user";


@Resolver()
export default class AgentResolver {

    @Mutation(() => AIAgentResponse)
    async createAgent(
        @Arg("data") data: CreateAgentInput,
        @Ctx() ctx: AuthorizedContext): Promise<AIAgentResponse> {
        const user = await safeFindUserOrFail(ctx.userId, ctx);
       
        console.log({ctx, user})

        const newAgent: AIAgent = new AIAgent()
        newAgent.name = data.name;
        newAgent.description = data?.description || "";
        newAgent.model = data.model;
        newAgent.domain = data.domain;
        newAgent.instruction = data?.instruction || ""
        newAgent.welcomeMessage = data?.welcomeMessage || ""

        const agentResponse: AIAgentResponse = {
            id: "bt123ggtx",
            name: data.name,
            description: data.description,
            domain: data.domain || AIAgentDomain.CUSTOMERSERVICE,
            embed: `<h1> Completed successfully by ${ctx.userId}</h1>`
        }
        return agentResponse

    }
}