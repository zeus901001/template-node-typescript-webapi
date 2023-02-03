import express from 'express'
import * as account from '../controllers/account'
import { verifyAccessToken } from '../middlewares/auth'

const router: express.Router = express.Router()

router.get('/users', account.users)

export default router