import {Request, Response, NextFunction} from 'express'
import {z} from "zod"
import {v4 as uuid} from "uuid"
import {db} from "../lib/db"

const serviceSchema = z.object({
    name: z.string().min(2),
    description: z.string().optional(),
    durationMin: z.number().int().min(10),
    price: z.number().min(0)
})

export function list(req: Request, res: Response, next: NextFunction){
    try{
        const services = db.prepare(`SELECT * FROM services WHERE is_active = 1`).all()
    
        return res.json(services)
    }catch(err){
        next(err)
    }
}

export function getById(req: Request, res: Response, next: NextFunction){

    try{
        const service = db.prepare(`
            SELECT * FROM services WHERE id = ? AND is_active = 1`).get(req.params.id)
    
        if(!service){
            return res.status(404).json({message: "Servico nao encontrado"})
        }
        return res.json(service);
    
        }catch(err){
        next(err)
    }
}

export function create(req: Request, res: Response, next: NextFunction){
    try{
        const data = serviceSchema.parse(req.body) //validacao do body
        const id = uuid();
    
        db.prepare(`INSERT INTO services (id, name, description, duration_min, price) VALUES (?,?,?,?,?)`).run(id,data.name,data.description??null,data.durationMin,data.price);
        return res.status(201).json({id,data})
    }
    catch(err){
        next(err)
    }
}

export function update(req: Request, res: Response, next: NextFunction){
    try{
        const data = serviceSchema.partial().parse(req.body)

        const service = db.prepare(`SELECT id FROM services WHERE id = ?`).get(req.params.id);
        if(!service){
            return res.status(404).json({message: "Servico nao encontrado"});
        }
        db.prepare(`UPDATE services
            SET
            name  = COALESCE(?, name),
            description = COALESCE(?, description),
            duration_min = COALESCE (? , duration_min),
            price = COALESCE (?, price) WHERE id = ?`).run(data.name??null,data.description??null,data.durationMin??null,data.price??null, req.params.id)
    }
    catch(err){
        next(err)
    }

}

export function remove(req: Request, res: Response, next: NextFunction){
    try{
        const service = db.prepare(`SELECT * FROM services WHERE id = ?`).get(req.params.id)
        if(!service){
            res.status(404).json({message: "Servico nao encontrado"});
        }
        db.prepare(`UPDATE services SET is_active = 0 WHERE id = ?`).run(req.params.id)
        return res.status(204).send()
    }catch(err){
        next(err);
    }
}