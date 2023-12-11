import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { Router } from 'express'

const handleCookieParser = (router: Router) => {
    router.use(cookieParser(process.env.COOKIE_KEY))
}

const handleBodyParser = (router: Router) => {
    router.use(bodyParser.urlencoded({ extended: true }));
    router.use(bodyParser.json());
}

export default [
    handleBodyParser,
    handleCookieParser,
];