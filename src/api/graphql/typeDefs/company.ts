import { CompanySize } from "../../../entities/company";
import { Field, ID, InputType, ObjectType, registerEnumType } from "type-graphql";

registerEnumType(CompanySize, {
    name: 'CompanySize',
    description: "The size of the company"
})

@InputType()
export class PartialCompanyInput {
    @Field(_ => String)
    name: string;

    @Field(_ => String)
    industry: string;

    @Field(() => CompanySize)
    size: CompanySize

    @Field(_ => String)
    location: string;
}

@ObjectType()
export default class Company {
    @Field(_ => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    industry: string;

    @Field()
    size: CompanySize

    @Field()
    location: string;
}


@ObjectType()
export class CompanyMutationResponse {
    @Field()
    success: boolean;

    @Field({ nullable: true })
    message?: string;

    @Field(_ => Company, { nullable: true })
    company?: Company
}

@InputType()
export class CompanyFilterInput {
    @Field()
    name: string;

    @Field({ nullable: true })
    location?: string

    @Field(_ => CompanySize, { nullable: true })
    size?: CompanySize

    @Field({ nullable: true })
    industry?: string;

}

@ObjectType()
export class CompanyQueryResponse {
    @Field()
    success: boolean;

    @Field({nullable: true})
    message?: string;

    @Field(_ => Company, {nullable: true})
    companies: Company[];

}
