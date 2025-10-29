import { Router } from "express";
import bodyParser from "body-parser";

import { authRouter } from "./authRouter";

export const index = Router();

index.use("/auth", authRouter);
