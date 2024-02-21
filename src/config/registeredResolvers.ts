import UserResolver from "../api/graphql/resolvers/user";
import AuthResolver from "../api/graphql/resolvers/auth";
import CompanyResolver from "../api/graphql/resolvers/company";
import RoleResolver from "../api/graphql/resolvers/role";

export const registeredResolvers = [
    AuthResolver,
    CompanyResolver,
    RoleResolver,
    UserResolver
] as const;