import { Router } from "express";
import bodyParser from "body-parser";
import { protect } from "../middleware/authMiddleware";
import { authRouter } from "./authRouter";
import { userRouter } from "./userRouter";

export const index = Router();

index.use("/auth", authRouter);

index.use(protect);
index.use("/user", userRouter);
