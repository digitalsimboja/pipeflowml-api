import { Field, ID, ObjectType } from "type-graphql";
import Role from "./role";

@ObjectType()
export default class User {
    @Field(_type => ID)
    id: string;

    @Field()
    email: string;

    @Field(_ => Date)
    createdAt: Date;

    @Field(_ => Date)
    updatedAt: Date;

    @Field(_ => Role)
    role!: Role; 
}