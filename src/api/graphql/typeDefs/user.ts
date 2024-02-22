import { Field, ID, ObjectType } from "type-graphql";
import Company from "./company";

@ObjectType()
export class User {
    @Field(_type => ID)
    id: string;

    @Field()
    email: string;

    @Field(_ => Date)
    createdAt: Date;

    @Field(_ => Date)
    updatedAt: Date;
}

@ObjectType()
export class UserQueryResponse {
    @Field(_type => ID)
    id: string;

    @Field()
    email: string;

}

@ObjectType()
export class UserCompayQueryResponse {
    @Field(_type => ID)
    id: string;

    @Field(_ => [Company], { nullable: true })
    companies?: Company[]
}