import {Request, Response, NextFunction} from 'express'
import {z} from "zod"
import {v4 as uuid} from "uuid"
import {db} from "../lib/db"

const professionalSchema = z.object({
    name: z.string().min(2),
    
})

