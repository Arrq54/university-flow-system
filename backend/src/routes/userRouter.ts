import { Router } from "express";
import userController from "../controllers/userController";

export const userRouter = Router();

userRouter.get("/info", userController.getUserInfo);

userRouter.post("/add", userController.addUser);

userRouter.get("/get/all", userController.getAllUsers);

userRouter.delete("/delete/:id", userController.deleteUser);

userRouter.put("/edit", userController.editUser);
