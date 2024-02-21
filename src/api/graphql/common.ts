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
