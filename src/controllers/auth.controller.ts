import {Request, Response, NextFunction} from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { email, z }  from "zod"
import {v4 as uuid } from "uuid"
import {db} from "../lib/db"


//Definiçao do DTO com Zod

const registerSchema = z.object({
    name: z.string().min(3),
    email: z.email(),
    password: z.string().min(8),
    phone: z.string().optional(),
})

//Definindo o DTO pra realizar Login no sistema

const loginSchema = z.object({
    email: z.email(),
    password: z.string(),
})

//criando funcao de registro

export async function register(req: Request, res: Response, next: NextFunction){
    try{
        //data (banco de dados consulta o molde pre estabelecido, e manda para a funcao parse comparar com dado
        const data = registerSchema.parse(req.body)
        const exists = db.prepare('SELECT id FROM users WHERE email = ?').get(data.email)
        //Verificao de existencias
        if(exists){
            return res.status(409).json({message: "E-mail já cadastrado, insira outro."})
        }
        //considerar 10 como padrao de critopgrafia
        const passwordHash = await bcrypt.hash(data.password,10);
        const id = uuid()
        db.prepare('INSERT INTO users (id,name,email,password_hash,phone) VALUES (?,?,?,?,?)').run(id,data.name,data.email,passwordHash,data.phone ?? null)
        return res.status(201).json({id,name: data.name, email: data.email}) 
    }catch(error){
        next(error) // direto pro errorHandler
    }finally{

    }
}
export async function login(req: Request, res: Response, next: NextFunction){
    try{
    // futuramente preciso tipar pra otimizar a consulta
    const data = loginSchema.parse(req.body)
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(data.email) as any
    if(!user){
        return res.status(401).json({message: "Credenciais inválidas."})
    }
    //comparacao da criptografias
    const valid = await bcrypt.compare(data.password,user.password_hash);
    if(!valid){
        return res.status(401).json({message: "Credenciais inválidas."})
    }
    const token = jwt.sign(
        {sub: user.id, role: user.role},
        process.env.JWT_SECRET!,
        {expiresIn: "900d"}
    )
    return res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    })
        
    }catch(error){
        next(error);
    }

}