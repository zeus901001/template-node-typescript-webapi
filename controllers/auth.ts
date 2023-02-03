import jsonWebToken from 'jsonwebtoken'
import randToken from 'rand-token'
import User, { IUser, IUserModel } from '../models/User'
import { Request, RequestHandler, Response } from 'express'
import { ACCESS_TOKEN_EXPIRES_IN, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN } from '../config'

/**
 * Token List.
 */
const tokenList: any = {}

/**
 * Generate user's access token.
 * @param {*} user 
 * @returns 
 */
export const generateAccessToken: Function = (user: IUser): string =>
    jsonWebToken.sign({ payload: user }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN })

/**
 * Generate user's refresh token.
 * @returns 
 */
export const generateRefreshToken: Function = (): string =>
    jsonWebToken.sign({ payload: randToken.uid(16) }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN })

/**
 * Sign In.
 * @param req 
 * @param res 
 */
export const signIn: RequestHandler = (req: Request, res: Response): void => {
    const { email, password } = req.body

    User.findOne({ email }, (err: Error, user: IUserModel) => {
        if (!user || !user.verifyPassword(password))
            return res.status(200).json({ success: false, message: `Your credentials are not correct.` })

        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken()

        tokenList[refreshToken] = user.email
        res.status(200).json({ success: true, accessToken, refreshToken })
    })
}

/**
 * Sign Up.
 * @param req 
 * @param res 
 */
export const signUp: RequestHandler = (req: Request, res: Response): void => {
    const { email } = req.body

    User.findOne({ email }, (err: Error, user: IUserModel) => {
        if (user)
            return res.status(200).json({ success: false, message: `Your e-mail already exists.` })

        user = new User(req.body)
        user.password = user.hashPassword()
        User.create(user, (err: Error) => {
            const accessToken = generateAccessToken(user)
            const refreshToken = generateRefreshToken()

            tokenList[refreshToken] = user.email
            res.status(200).json({ success: true, accessToken, refreshToken })
        })
    })
}

/**
 * Update your access token.
 * @param req 
 * @param res 
 */
export const updateAccessToken: RequestHandler = (req: Request, res: Response): void => {
    const { refreshToken } = req.body

    if (refreshToken && (refreshToken in tokenList)) {
        User.findOne({ email: tokenList[refreshToken] }, (err: Error, user: IUser) => {
            const accessToken = generateAccessToken(user)
            res.status(200).json({ accessToken })
        })
    }
    else {
        res.status(403).send(`Your refresh token is invalid.`)
    }
}

/**
 * Remove your refresh token.
 * @param {*} req 
 * @param {*} res 
 */
export const removeRefreshToken: RequestHandler = (req: Request, res: Response): void => {
    const { refreshToken } = req.body

    if (refreshToken && refreshToken in tokenList) {
        delete tokenList[refreshToken]
    }

    res.status(200).send(`Your refresh token is removed successfully.`)
}