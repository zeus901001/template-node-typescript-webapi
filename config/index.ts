import dotenv from 'dotenv'

dotenv.config()

export const SERVER_URI: string = process.env.SERVER_URI || `http://localhost`
export const SERVER_PORT: number = Number(process.env.SERVER_PORT) || 8001

export const MONGO_URI: string = process.env.MONGO_URI || `mongodb://localhost`
export const MONGO_PORT: number = Number(process.env.MONGO_PORT) || 27017
export const MONGO_PSWD: string = process.env.MONGO_PSWD || `password`
export const MONGO_NAME: string = process.env.MONGO_NAME || `dbexample`

export const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET || `access-token-secret`
export const ACCESS_TOKEN_EXPIRES_IN: string = process.env.ACCESS_TOKEN_EXPIRES_IN || `10m`
export const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET || `refresh-token-secret`
export const REFRESH_TOKEN_EXPIRES_IN: string = process.env.REFRESH_TOKEN_EXPIRES_IN || `30 days`