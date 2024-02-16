import AuthResolver from "../api/graphql/resolvers/auth";
import CompanyResolver from "../api/graphql/resolvers/company";

export const registeredResolvers = [AuthResolver, CompanyResolver] as const;