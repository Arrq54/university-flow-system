import { Request, Response } from "express";
import { Message } from "../../../models/Message";

export const getMessages = async (req: Request, res: Response) => {
    try {
        const { conversationId } = req.params;

        if (!conversationId) {
            res.status(400).json({ message: "Conversation ID is required" });
            return;
        }

        const messages = await Message.find({ conversationId }).sort({ timestamp: 1 });
        res.status(200).json({ messages });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
