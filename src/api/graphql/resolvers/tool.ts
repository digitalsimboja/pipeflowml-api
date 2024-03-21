import { Ctx, Mutation, Resolver } from "type-graphql";
import { AuthorizedContext } from "../common";
import { CreateToolResponse } from "../typeDefs/tool";

@Resolver()
export default class ToolResolver {
    @Mutation(() => CreateToolResponse)
    async createTool(@Ctx() ctx: AuthorizedContext) {
        console.log(ctx)
    }
}