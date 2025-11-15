import { Router } from "express";
import bodyParser from "body-parser";
import { protect } from "../middleware/authMiddleware";
import { authRouter } from "./authRouter";
import { userRouter } from "./userRouter";
import { courseRouter } from "./courseRouter";

export const index = Router();

index.use("/auth", authRouter);

index.use(protect);
index.use("/user", userRouter);
index.use("/course", courseRouter);
