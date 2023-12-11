import { Router } from "express";
import { Wrapper } from "./auth/interface";

export const applyMiddleware = (middleware: Wrapper[], router: Router) => {
    for (const m of middleware) {
        m(router);
    }
}