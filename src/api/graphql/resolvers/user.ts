import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { AuthorizedContext } from "../common";
import {  UserCompayQueryResponse, UserQueryResponse } from "../typeDefs/user";
import { AppDataSource } from "../../../config/datasource";
import { User, safeFindUserOrFail } from "../../../entities/user";

@Resolver()
export default class UserResolver {
    @Query(() => UserQueryResponse)
    async getUser(@Arg("id") id: string, @Ctx() ctx: AuthorizedContext) {
        const userId = ctx.userId;
        if (userId !== id || !ctx.isAdmin || !ctx.isEvvelandCrew) {
            throw new Error("Not authorized");
        }
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOne({
            where: { id: userId }
        })
        if (!user) {
            throw new Error("User not found")
        }

        return {
            id: user.id,
            email: user.email,
            role: user.role
        }
    }

    @Query(() => UserCompayQueryResponse)
    async getUserCompany(@Arg("id") id: string, @Ctx() ctx: AuthorizedContext) {
        const user = await safeFindUserOrFail(id, ctx, ["businessProfile"])

        return {
            id: user.id,
            companies: user.businessProfile
        }
    }


}