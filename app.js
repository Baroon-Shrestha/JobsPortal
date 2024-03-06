import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import userRouter from './routes/userRouter.js'
import job from './routes/job.js'
import applicationRouter from './routes/applicationRouter.js'
import { dbConnection } from './database/dbConnection.js';
import { errorHanlder } from './middlewares/errorHandling.js';

const app = express();
dotenv.config({ path: './config/config.env' })

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}))


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp/"
}))


app.use('/api/jobsportal/user', userRouter)
app.use('/api/jobsportal/job', job)
app.use('/api/jobsportal/application', applicationRouter)

dbConnection();

app.use(errorHanlder)

export default app;