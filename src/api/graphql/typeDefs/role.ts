
import { Field, ID, InputType, ObjectType, registerEnumType } from "type-graphql";
import { User } from "./user";
import { AuthorizationRoles } from "../common";

registerEnumType(AuthorizationRoles, {
    name: "AuthorizationRoles",
    description: "Authorization roles"
})
@ObjectType()
export default class Role {
    @Field(_ => ID)
    id: string;

    @Field(() => AuthorizationRoles)
    name: string;

    @Field(_ => [User], { nullable: true })
    users?: User[]
}

@InputType()
export class RoleInput {
    @Field(() => AuthorizationRoles)
    name: AuthorizationRoles;
}