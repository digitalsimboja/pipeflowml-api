import { Router } from "express";
import { User } from "src/entities/user";


export type Wrapper = (router: Router) => void;

export interface JWT {
    email: string;
    user: {
        id: string;
    }
}

export interface AuthorizedJWT extends JWT {
    instances: EntityInstances;
}

interface EntityInstances {
    user: User
}