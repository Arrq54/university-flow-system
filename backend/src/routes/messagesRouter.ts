import { Router } from "express";
import messagesController from "../controllers/messagesController";

export const messagesRouter = Router();

messagesRouter.get("/list", messagesController.getUserConversationList);
messagesRouter.post("/send", messagesController.sendMessage);
