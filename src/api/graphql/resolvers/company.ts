import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import  { CompanyMutationResponse, PartialCompanyInput } from "../typeDefs/company";
import { Context } from "../common";

@Resolver()
export default class CompanyResolver {
    @Mutation(() => CompanyMutationResponse)
    async createCompany(@Arg("data") data: PartialCompanyInput, @Ctx() ctx: Context) {
        console.log({data, ctx})
    }
}