import express from 'express'
import * as auth from '../controllers/auth'
import { verifyRefreshToken } from '../middlewares/auth'

const router: express.Router = express.Router()

router.post('/login', auth.login)
router.post('/register', auth.register)
router.post('/updateAccessToken', verifyRefreshToken, auth.updateAccessToken)
router.post('/removeRefreshToken', auth.removeRefreshToken)

export default router