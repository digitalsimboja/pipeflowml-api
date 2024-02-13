import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class SignUpUserInput {
    @Field()
    password: string;

    @Field()
    email: string;
}

@ObjectType()
export class SignUpUserResponse {
    @Field()
    sessionToken: string;
}

@InputType()
export class SignInUserInput {
    @Field(_ => String)
    email: string;

    @Field(_ => String)
    password: string;
}

@ObjectType()
export class SignInUserResponse {
    @Field()
    sessionToken: string;
}

