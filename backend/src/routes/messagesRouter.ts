import { Router } from "express";
import messagesController from "../controllers/messagesController";

export const messagesRouter = Router();

messagesRouter.get("/list/:userId", messagesController.getUserConversationList);
messagesRouter.get("/:conversationId", messagesController.getMessages);
messagesRouter.post("/send", messagesController.sendMessage);
messagesRouter.post("/:conversationId/message", messagesController.sendMessage);
