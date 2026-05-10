import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"

export function authenticate(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization
    if(!authHeader?.startsWith("Bearer ")){
        return res.status(401).json({message: "Error, token nao fornecido!"})
    }
    const token = authHeader.split(" ")[1]
    if(!token){
        return res.status(401).json({message: "Token nao fornecido"})
    }
    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET!);
        (req as any ).user = payload
        next()

    }catch{
        return res.status(401).json({message: "Token invalido ou expirado"});
    }
}

export function authorize(...roles: String[]){
    
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user
        
        if(!roles.includes(user.role)){
            return res.status(403).json({message: "Acesso Negado"})
        }
        next()
    }
    
    
}