import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { registeredResolvers } from "./registeredResolvers";
import { AuthorizationRoles } from "../api/graphql/common"


export async function getSchema() {
    return buildSchema({
        resolvers: registeredResolvers,
        authChecker: (args, roles) => {
            // If no roles are supplied, then this assumes we are requesting for user auth
            const authRoles: AuthorizationRoles[] = roles.length > 0 ? roles : [AuthorizationRoles.USER]

            if (authRoles.some(r => r === AuthorizationRoles.ADMIN) && args.context.isAdmin) {
                return true;
            }

            if (authRoles.some(r => r === AuthorizationRoles.EVELAND_CREW) && args.context.isEvvelandCrew) {
                return true;
            }

            if (authRoles.some(r => r === AuthorizationRoles.PARTNER) && args.context.isPartner) {
                return true;
            }

            if (authRoles.some(r => r === AuthorizationRoles.USER) && args.context.isUser) {
                return true
            }
            return false

        }
    })
}

// export async function initApolloServer() {
//     return new ApolloServer({
//         schema,
//     })
// }