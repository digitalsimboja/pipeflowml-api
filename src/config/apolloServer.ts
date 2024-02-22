import { ApolloServer, Config } from "apollo-server"
import { buildSchema } from "type-graphql";
import { registeredResolvers } from "./registeredResolvers";
import { AuthorizationRoles, AuthorizedContext } from "../api/graphql/common"
import { cookieOptions } from "../api/controllers/auth";
import { verify } from 'jsonwebtoken';
import { JWT_KEY } from "../middleware/auth";
import { AuthorizedJWT } from "../middleware/auth/interface";
import { serialize } from "cookie"


export async function getSchema() {
    return buildSchema({
        resolvers: registeredResolvers,
        authChecker: (args, roles) => {
            // If no roles are supplied, then this assumes we are requesting for user auth
            const authRoles: AuthorizationRoles[] = roles.length > 0 ? roles : [AuthorizationRoles.DEFAULT]
            
            if (authRoles.some(r => r === AuthorizationRoles.ADMIN) && args.context.isAdmin) {
                return true;
            }

            if (authRoles.some(r => r === AuthorizationRoles.EVELAND_CREW) && args.context.isEvvelandCrew) {
                return true;
            }

            if (authRoles.some(r => r === AuthorizationRoles.PARTNER) && args.context.isPartner) {
                return true;
            }

            return false

        },
        emitSchemaFile: './schema.graphql'
    })
}

export const apolloConfig: Config = {
    context: async ctx => {
        let auth: {
            userToken?: string;
        } = {};

        if (ctx.req?.signedCookies) {
            auth = ctx.req.signedCookies;
        }
        if (ctx.req?.headers?.authorization) {
            const bearer = ctx.req.headers.authorization
            auth.userToken = bearer
        }

        let context: Partial<AuthorizedContext> = {
            isAdmin: false,
            isEvvelandCrew: false,
            isPartner: false,
            cookies: auth,
            userId: null,
            setCookie: (key: string, value: string) => {
                if (!ctx.res) throw new Error('Context does not have response set')
                const serializedCookie = serialize(key, value, cookieOptions({ httpOnly: true }));

                ctx.res.setHeader('userToken', serializedCookie);
            },
            clearCookie: (key: string) => {
                if (!ctx.res) throw new Error('Context does not have response set');

                const expiredCookie = serialize(key, '', {
                    expires: new Date(0),
                    httpOnly: true
                });

                // Set the expired cookie in the response
                ctx.res.setHeader('userToken', expiredCookie);
            }
        }

        try {
            if (auth.userToken) {
                let userId;
                const token = auth.userToken as string;
                const decoded = verify(token, JWT_KEY, { ignoreExpiration: true, }) as AuthorizedJWT;
                userId = decoded.user.id
                context.userId = userId;
            }

        } catch (err) {
            console.error(`Error in setting up Apollo Context`, err);
        }
        return context;
    }
}


export async function initApolloServer() {
    const schema = await getSchema();

    const server = new ApolloServer({
        ...apolloConfig,
        schema,
    });

    return server;
}