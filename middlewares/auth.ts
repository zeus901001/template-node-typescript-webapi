import jsonWebToken from 'jsonwebtoken'
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config'

/**
 * Verify your access token middleware.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const verifyAccessToken: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
    const accessToken = req.headers['x-access-token']?.toString()

    if (!accessToken) {
        res.status(403).send(`Your access token is required for authentication.`)
        return
    }

    jsonWebToken.verify(accessToken, ACCESS_TOKEN_SECRET, (err, decodedToken: any): void => {
        if (err) {
            res.status(401).send(`Your access token is expired.`)
            return
        }
        else {
            req.body.user = decodedToken.payload
            next()
        }
    })
}

/**
 * Verify your refresh token middleware.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const verifyRefreshToken: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
    const refreshToken: string = req.body.refreshToken

    if (!refreshToken) {
        res.status(403).send(`Your refresh token is required for authentication.`)
        return
    }

    jsonWebToken.verify(refreshToken, REFRESH_TOKEN_SECRET, (err): void => {
        if (err) {
            res.status(403).send(`Your refresh token is expired.`)        
            return
        }
        else
            next()
    })
}