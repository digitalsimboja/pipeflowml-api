import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { CompanyMutationResponse, PartialCompanyInput } from "../typeDefs/company";
import { Context } from "../common";
import { AppDataSource } from "../../../config/datasource";
import { User, safeFindUserOrFail } from "../../../entities/user";
import { Company, safeGetCompanyByIdOrFail } from "../../../entities/company";
import { PreferenceInput } from "../typeDefs/preference";
import { Preference } from "../../../entities/preference";


@Resolver()
export default class CompanyResolver {

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

    @Mutation(() => CompanyMutationResponse)
    async allocatePreferenceToCompany(
        @Arg("companyId") companyId: string,
        @Arg("preferences", () => [PreferenceInput]) preferences: PreferenceInput[],
        @Ctx() ctx: Context
    ) {

        try {
            if (!ctx.userId) {
                throw new Error("Authentication required to allocate preferences to company.");
            }
            const user = await safeFindUserOrFail(ctx.userId, ctx, []);
            const company = await safeGetCompanyByIdOrFail(companyId, ["user"]);


            if (!user || !company) {
                throw new Error('User or company not found.')
            }

            if (company.user.id !== user.id) {
                throw new Error("You do not have permission to allocate preferences to this company.");
            }

            const preferenceRepository = AppDataSource.getRepository(Preference)
            const companyRepository = AppDataSource.getRepository(Company)

            const preferenceEntities = preferences.map(prefInput => {
                const preference = new Preference()
                preference.preferredIndustry = prefInput.preferredIndustry;
                preference.preferredBusinessSize = prefInput.preferredBusinessSize;
                preference.geographicPreferences = prefInput.geographicPreferences;
                preference.businessProfile = company;

                return preference;

            })

            await preferenceRepository.save(preferenceEntities)

            company.preferences = company.preferences || [];

            company.preferences = [...company.preferences, ...preferenceEntities]

            await companyRepository.save(company)

            return {
                success: true,
                message: "Company preferences allocated successfully",
                company: company
            }
        } catch (error) {
            return {
                success: false,
                message: `Failed to allocate preference to  the company with id ${companyId}`,
                company: null
            }
        }
    }
}