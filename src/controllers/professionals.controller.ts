import {Request, Response, NextFunction} from 'express'
import {boolean, z} from "zod"
import {v4 as uuid} from "uuid"
import {db} from "../lib/db"

const professionalSchema = z.object({
    name: z.string().min(2),
    bio: z.string().optional(),
})


export function list(req: Request, res: Response, next: NextFunction){
    try{
        const data =  db.prepare(`SELECT * FROM professionals WHERE is_active = 1`).all()
        return res.json(data);
        }       
        catch(err){
        next(err)
    }
}


export function findById(req: Request, res: Response, next: NextFunction){
    try{
        const professionals = db.prepare(`SELECT * FROM professionals WHERE ID = ?`).get(req.params.id);
        if(!professionals){
            return res.json({message: "Profissional nao encontrado"})
        }
        return professionals;
    }catch(err){
        next(err)
    }

}

export function create(req:Request, res: Response, next: NextFunction){
    const professionals = professionalSchema.parse(req.body);
    const id = uuid();
}