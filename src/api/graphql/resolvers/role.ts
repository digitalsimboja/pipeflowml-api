import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import Role, { RoleInput } from "../typeDefs/role";
import { Role as DBRole } from "../../../entities/role";
import { Context } from "../common";
import { safeFindUserOrFail } from "../../../entities/user";
import { AppDataSource } from "../../../config/datasource";

@Resolver()
export default class RoleResolver {
    @Mutation(() => Role)
    async createRole(
        @Arg("data") roleInput: RoleInput,
        @Ctx() ctx: Context
    ): Promise<Role> {
        try {
            const userId = ctx.userId;
            const user = await safeFindUserOrFail(userId, ctx);

            if (user.role.name !== "ADMIN") {
                throw new Error("You are not authorized to create a role");
            }

            const roleRepository = AppDataSource.getRepository(DBRole);
            const newRole = new DBRole();
            
            newRole.name = roleInput.name;
            newRole.users = [];
            await roleRepository.save(newRole);

            return newRole;
        } catch (error) {
            throw new Error(`Could not create role: ${error}`);
        }
    }
}
