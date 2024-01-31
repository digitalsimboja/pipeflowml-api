import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { SignUpUserInput, SignUpUserResponse } from "../typeDefs/auth";
import { User, hashPassword } from "../../../entities/user";
import { Context } from "../common";
import { AppDataSource } from "../../../config/datasource";
import { signUserToken } from "../../../utils/jwt";


@Resolver()
export default class AuthResolver {

    async _signUpNewUser(data: SignUpUserInput) {
        const userRepository = AppDataSource.getRepository(User);

        const newUser = new User();
        newUser.email = data.email;
        newUser.password = data.password;

        const savedUser = await userRepository.save(newUser);

        return { user: savedUser };
    }

    @Query(_ => String)
    hello(): string {
        return "Hello WORLD"
    }

    @Mutation(() => SignUpUserResponse)
    async signUp(@Arg("data") data: SignUpUserInput, @Ctx() ctx: Context) {
        data = {
            ...data,
            email: data.email.toLocaleLowerCase().trim(),
            password: await hashPassword(data.password)
        }
        try {
            // Check if user with email already exists
            const userRepository = AppDataSource.getRepository(User);
            const existingUser = await userRepository.findOne({
                where: { email: data.email }
            });
            if (existingUser) {
                const errorMessage = "User with this email already exists";
                throw new Error(errorMessage);
            }

            const { user } = await this._signUpNewUser(data)

            const sessionToken = signUserToken(user);
            console.log(ctx)
            ctx.setCookie('userToken', sessionToken)

            return { sessionToken }

        } catch (err: any) {
            //TODO: Replace in production. Use loggin service instead
            //const errorMessage = "An issue occured creating Evveland AI account";
            throw new Error(err);
        }

    }

}