import { Router } from "express";
import authController from "../controllers/authController";
import bodyParser from "body-parser";

export const authRouter = Router();

authRouter.post("/signIn", authController.signIn);
authRouter.post("/signUp", authController.signUp);
