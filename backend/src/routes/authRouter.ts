import { Router } from "express";
import authController from "../controllers/authController";

export const authRouter = Router();

authRouter.post("/signIn", authController.signIn);
authRouter.post("/signUp", authController.signUp);
authRouter.post("/verify-token", authController.verifyToken);
