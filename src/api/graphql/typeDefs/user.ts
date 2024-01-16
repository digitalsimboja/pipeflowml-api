import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export default class User {
    @Field(_type => ID)
    id: string;

    @Field()
    email: string;

    @Field(_ => Date)
    createdAt: Date;
}