import { Request, Response } from "express";
import { Conversation } from "../../../models/Conversation";

export const getUserConversationList = async (req: Request, res: Response) => {
    try {
        const result = await Conversation.find({ memberIds: req.params.userId });
        res.status(200).send({ conversations: result });
    } catch (error) {
        res.status(500).send("Server error");
    }
};
