
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./user";


@ObjectType()
export default class Role {
    @Field(_ => ID)
    id: string;

    @Field()
    name: string;

    @Field(_ => [User], { nullable: true })
    users?: User[]
}