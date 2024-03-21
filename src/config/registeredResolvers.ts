import UserResolver from "../api/graphql/resolvers/user";
import AuthResolver from "../api/graphql/resolvers/auth";
import CompanyResolver from "../api/graphql/resolvers/company";
import AgentResolver from "../api/graphql/resolvers/agent";
import ToolResolver  from "../api/graphql/resolvers/tool";


export const registeredResolvers = [
    AgentResolver,
    AuthResolver,
    CompanyResolver,
    UserResolver,
    ToolResolver
] as const;