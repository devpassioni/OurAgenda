import {Router} from 'express'
import {list,getById,create, remove,update} from "../controllers/services.controller"
import { authenticate, authorize } from '../middlewares/auth';

export const serviceRouter = Router();

//GET
serviceRouter.get("/",list)
serviceRouter.get("/:id",getById)


//
serviceRouter.post("/",authenticate,authorize("ADMIN"),create)



//PUT
serviceRouter.put("/:id",authenticate,authorize("ADMIN"),update)


//delete
serviceRouter.delete("/:id",authenticate,authorize("ADMIN"),remove)