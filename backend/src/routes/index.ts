import { Router } from "express";
import bodyParser from "body-parser";
import { protect } from "../middleware/authMiddleware";
import { authRouter } from "./authRouter";

export const index = Router();

index.use("/auth", authRouter);

index.use(protect);
