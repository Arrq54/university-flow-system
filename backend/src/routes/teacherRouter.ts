import { Router } from "express";
import teachersController from "../controllers/teachersController";

export const teacherRouter = Router();

teacherRouter.get("/get/:id", teachersController.getTeacherData);
