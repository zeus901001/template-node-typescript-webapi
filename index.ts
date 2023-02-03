import path from 'path'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import authRoutes from './routes/auth'
import apiRoutes from './routes/api'
import { SERVER_URI, SERVER_PORT, MONGO_URI, MONGO_PORT, MONGO_NAME } from './config'

const app = express()

/**
 * Config an express app.
 */
app.set('env', process.env.NODE_ENV)
app.set('port', SERVER_PORT)

app.use(cors({ origin: '*' }))
app.use(express.static(path.join(__dirname, './dist')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/auth', authRoutes)
app.use('/api', apiRoutes)

/**
 * Start an express app.
 */
app.listen(SERVER_PORT, () => {
    console.log(`> Http Server is running at ${SERVER_URI}:${SERVER_PORT}`)
})

/**
 * Connect the mongodb.
 */
mongoose.set('strictQuery', false)
mongoose.connect(`${MONGO_URI}:${MONGO_PORT}/${MONGO_NAME}`).then(() => {
    console.log(`> MongoDB is connected at ${MONGO_URI}:${MONGO_PORT}/${MONGO_NAME}`)
}).catch(err => {
    throw err
})