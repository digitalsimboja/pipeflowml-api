import UserResolver from "../api/graphql/resolvers/user";
import AuthResolver from "../api/graphql/resolvers/auth";
import CompanyResolver from "../api/graphql/resolvers/company";
import AgentResolver from "../api/graphql/resolvers/agent";

export const registeredResolvers = [
    AgentResolver,
    AuthResolver,
    CompanyResolver,
    UserResolver
] as const;