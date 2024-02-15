import { CompanySize } from "src/entities/company";
import { Field, InputType, registerEnumType } from "type-graphql";

registerEnumType(CompanySize, {
    name: 'CompanySize',
    description: "The size of the company"
})

@InputType()
export class PartialCompanyInput {
    @Field(_ => String)
    name: string;

    @Field()
    industry: string;

    @Field(() => CompanySize)
    size: CompanySize

    @Field()
    location: string;
}