import { Request, Response, RequestHandler } from 'express';

export const index: RequestHandler = (req: Request, res: Response): void => {
    res.status(200).send(req.body.user)
}