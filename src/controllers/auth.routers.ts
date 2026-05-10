import {Router} from 'express'
import {register, login} from "../controllers/auth.controller"
import { authenticate } from '../middlewares/auth';

export const authRouter = Router();



//POSTS
authRouter.post("/register",register);
authRouter.post("/login",login);
