import { CookieOptions } from "express";
import {DateTime} from "luxon"

export const cookieOptions = (overides?: CookieOptions): CookieOptions => {
    return {
        expires: DateTime.now().plus({ year: 1}).toJSDate(),
        httpOnly: false,
        path: "/",
        signed: true,
        ...overides
    }
}