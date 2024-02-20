import { CompanySize } from "../../../entities/company";
import { Field, InputType, registerEnumType } from "type-graphql";
registerEnumType(CompanySize, {
    name: 'CompanySize',
    description: "The size of the company"
})

@InputType()
export class PreferenceInput {
    @Field()
    preferredIndustry: string;

    @Field(() => CompanySize)
    preferredBusinessSize: CompanySize;

    @Field()
    geographicPreferences: string;
}