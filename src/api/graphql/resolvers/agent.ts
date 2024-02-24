import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { AIAgentResponse, CreateAgentInput } from "../typeDefs/agent";
import { AuthorizedContext } from "../common";
import { AIAgent, AIAgentDomain } from "../../../entities/agent";
import { safeFindUserOrFail } from "../../../entities/user";
import { AppDataSource } from "../../../config/datasource";
import { UserAgentDeployment } from "../../../entities/userAgentDeployment";


@Resolver()
export default class AgentResolver {

    @Mutation(() => AIAgentResponse)
    async createAgent(
        @Arg("data") data: CreateAgentInput,
        @Ctx() ctx: AuthorizedContext): Promise<AIAgentResponse> {
        const user = await safeFindUserOrFail(ctx.userId, ctx);

        const newAgent = new AIAgent();
        newAgent.name = data.name;
        newAgent.description = data?.description || "";
        newAgent.model = data.model;
        newAgent.domain = data.domain;
        newAgent.instruction = data?.instruction || "";
        newAgent.welcomeMessage = data?.welcomeMessage || "";
 
        const agentRepository = AppDataSource.getRepository(AIAgent)
        await agentRepository.save(newAgent);

        const userDeploymentsRepository = AppDataSource.getRepository(UserAgentDeployment)
        const newUserAgenDeploymnet = new UserAgentDeployment()
        newUserAgenDeploymnet.user = user;
        newUserAgenDeploymnet.agent = newAgent;

        await  userDeploymentsRepository.save(newUserAgenDeploymnet);
        // Find the deployments for  this user and add the newly created agent to it
        let userDeployments = await userDeploymentsRepository.findOne({ where: {
            user: user
        }})
        // Update the user deployments with the new



        const agentResponse: AIAgentResponse = {
            id: "bt123ggtx",
            name: data.name,
            description: data.description,
            domain: data.domain || AIAgentDomain.CUSTOMERSERVICE,
            sharableURL: `<h1> Completed successfully by ${ctx.userId}</h1>`
        }
        return agentResponse

    }
}