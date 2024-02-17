import UserResolver from "../api/graphql/resolvers/user";
import AuthResolver from "../api/graphql/resolvers/auth";
import CompanyResolver from "../api/graphql/resolvers/company";

export const registeredResolvers = [AuthResolver, CompanyResolver, UserResolver] as const;