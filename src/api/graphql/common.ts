export interface Context {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userId: any;
    cookies: any;
    setCookie: (key: string, value: string) => void;
    clearCookie: (key: string) => void;
}
export interface MaybeAuthorizedContext extends Context {
    isAdmin?: boolean;
    isEvvelandCrew?: boolean;
    isPartner?: boolean;
}

export enum AuthorizationRoles {
    DEFAULT = "USER",
    ADMIN = "ADMIN",
    EVELAND_CREW = "EVELAND_CREW",
    PARTNER = "PARTNER"
}

export interface AuthorizedContext extends Context {
    isAdmin: boolean;
    isEvvelandCrew: boolean;
    isPartner: boolean;
}

// eslint-disable-next-line
export const HelpfulInstruction = "You are a helpful, respectful, and honest assistant. Your goal is to respond accurately and not to provide false information. If you don't know the answer, please refrain from sharing inaccurate information."