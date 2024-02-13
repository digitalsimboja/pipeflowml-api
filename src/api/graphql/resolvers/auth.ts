import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { SignInUserInput, SignInUserResponse, SignUpUserInput, SignUpUserResponse } from "../typeDefs/auth";
import { User, authenticateUser, hashPassword } from "../../../entities/user";
import { Context, MaybeAuthorizedContext } from "../common";
import { AppDataSource } from "../../../config/datasource";
import { signUserToken } from "../../../utils/jwt";


const loginUser = async (params: {
    data: SignInUserInput;
    ctx: Context
}) => {
    const { data, ctx } = params;
    if (!data.email || !data.password) {
        throw new Error('User authentication failed')
    }

    const { email, password } = data;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
        where: { email: email },
    });

    if (!user) {
        throw new Error("User authentication failed")
    }

    const isAuthenticated = await authenticateUser(password, user.password)

    if (!isAuthenticated) {
        throw new Error("Password authentication failed")
    }

    const sessionToken = signUserToken(user)

    ctx.setCookie('userToken', sessionToken);
    console.log({ user })

    return { sessionToken }
}
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
        return "Welcome to Evveland AI agents"
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

            ctx.setCookie('userToken', sessionToken)

            return { sessionToken }

        } catch (err: any) {
            //TODO: Replace in production. Use loggin service instead
            //const errorMessage = "An issue occured creating Evveland AI account";
            throw new Error(err);
        }

    }

    @Mutation(_ => SignInUserResponse)
    async signInUser(@Arg('data') data: SignInUserInput, @Ctx() ctx: MaybeAuthorizedContext) {
        data = {
            ...data,
            email: data.email?.toLocaleLowerCase().trim()
        }

        return loginUser({
            ctx,
            data
        })

    }

}