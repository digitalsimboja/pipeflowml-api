export interface Context {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cookies: any;
    setCookie: (key: string, value: string) => void;
    clearCookie: (key: string) => void;
}
export interface MaybeAuthorizedContext extends Context {
    isAdmin?: boolean;
    isEvvelandCrew?:boolean;
    isPartner?: boolean;
}