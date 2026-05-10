import express from 'express'
import cors from 'cors'
import { authRouter } from './controllers/auth.routers'
import { errorHandler } from './controllers/errorHandler'
import { serviceRouter } from './controllers/services.routes'

export const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (req,res) => {
    res.json({status: "ok"})
})

app.use("/auth", authRouter)
app.use("/services",serviceRouter)
app.use(errorHandler)