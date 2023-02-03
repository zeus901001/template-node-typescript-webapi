import { Request, Response, RequestHandler } from 'express';
import User from '../models/User'

/**
 * Get all users.
 * @param req Request
 * @param res Response
 */
export const users: RequestHandler = (req: Request, res: Response) => {
    User.find((err, users) => {
        if (err)
            throw err

        res.send(users)
    })
}