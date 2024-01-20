import { Router } from "express";


export type Wrapper = (router: Router) => void;

export interface JWT {
    email: string;
    user: {
        id: string;
    }
}