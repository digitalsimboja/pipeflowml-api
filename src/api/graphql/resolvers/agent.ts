import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { AIAgentResponse, CreateAIAgentInput } from "../typeDefs/agent";
import { AuthorizedContext } from "../common";
import { AIAgentDomain } from "../../../entities/agent";


@Resolver()
export default class AgentResolver {

    @Mutation(() => AIAgentResponse)
    async createAgent(
        @Arg("data") data: CreateAIAgentInput,
        @Ctx() ctx: AuthorizedContext): Promise<AIAgentResponse> {
        // Check if the user is authorized
        // Accept the uploaded pre-trained data
        // Use it to train the Agent
        // Assign the agent created to the user that deployed it
        // generate the embed link
        // if training succeeds, return the trained agent
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