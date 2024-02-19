import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CompanyMutationResponse, PartialCompanyInput } from "../typeDefs/company";
import { AuthorizedContext, Context } from "../common";
import { AppDataSource } from "../../../config/datasource";
import { User, safeFindUserOrFail } from "../../../entities/user";
import { Company } from "../../../entities/company";
import { UserCompayQueryResponse } from "../typeDefs/user";


@Resolver()
export default class CompanyResolver {
    @Query(() => UserCompayQueryResponse)
    async getUserCompany(@Arg("id") id: string, @Ctx() ctx: AuthorizedContext) {
        const user = await safeFindUserOrFail(id, ctx, ["businessProfile"])

        return {
            id: user.id,
            companies: user.businessProfile
        }
    }

    @Mutation(() => CompanyMutationResponse)
    async createCompany(@Arg("data") data: PartialCompanyInput, @Ctx() ctx: Context) {
        try {
            const userId = ctx.userId;
            const userRepository = AppDataSource.getRepository(User)
            const user = await userRepository.findOne({
                where: { id: userId }
            })

            if (!user) {
                return {
                    success: false,
                    message: "User not found",
                    company: null
                }
            }
            const companyRepository = AppDataSource.getRepository(Company)
            const company = new Company({
                name: data.name,
                industry: data.industry,
                size: data.size,
                location: data.location

            })
            company.user = user;
            await companyRepository.save(company)

            user.businessProfile = [...(user.businessProfile || []), company]
            await userRepository.save(user)

            return {
                success: true,
                message: "Company created successfully",
                company: company
            }

        }
        catch (error) {
            return {
                success: false,
                message: "Failed to create company",
                company: null
            }
        }


    }
}