import {Request, Response, NextFunction} from "express";
import { z, ZodError } from "zod";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction){
    if(err instanceof ZodError){
        return res.status(422).json({
            message:'Dados Inválidos',
            errors: z.treeifyError(err)
        })
    }
    console.error(err);
    return res.status(500).json({message: "Erro interno do servidor."});
}