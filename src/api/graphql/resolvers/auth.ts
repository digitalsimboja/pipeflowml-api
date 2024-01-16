import { Arg, Mutation, Query } from "type-graphql";
import { SignUpUserInput, SignUpUserResponse } from "../typeDefs/auth";
import { hashPassword } from "../../../entities/user";

export default class AuthResolver {
    @Query(_ => String)
     hello(): string{
        return "Hello WORLD"
    }
    @Mutation(() => SignUpUserResponse)
    async signUpUser(@Arg("data") data: SignUpUserInput): Promise<SignUpUserResponse> {
        data = {
            ...data,
            email: data.email.toLocaleLowerCase().trim(),
            password: await hashPassword(data.password)
        }
        try {
            const sessionToken = "jjdjddhdhdhh"

            return { sessionToken }

        } catch (err) {
            const errorMessage = "An issue occured creating Evveland AI account";
            throw new Error(errorMessage);
        }

    }

}