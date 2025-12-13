import { Request, Response } from "express";
import { Conversation } from "../../../models/Conversation";
import { Message } from "../../../models/Message";

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { receiverIds, content } = req.body;
        const { conversationId } = req.params;
        const senderId = (req as any).user._id;

        if (!content) {
            res.status(400).json({ message: "Content is required" });
            return;
        }

        let conversation;

        if (conversationId) {
            conversation = await Conversation.findById(conversationId);
            if (!conversation) {
                res.status(404).json({ message: "Conversation not found" });
                return;
            }
        } else {
            if (!receiverIds || !Array.isArray(receiverIds) || receiverIds.length === 0) {
                res.status(400).json({ message: "Invalid request data" });
                return;
            }

            const memberIds = Array.from(new Set([senderId, ...receiverIds])).sort();

            conversation = await Conversation.findOne({
                memberIds: {
                    $size: memberIds.length,
                    $all: memberIds,
                },
            });

            if (!conversation) {
                conversation = await Conversation.create({ memberIds });
            }
        }

        const message = await Message.create({
            conversationId: conversation._id,
            senderId,
            content,
        });

        res.status(201).json(message);
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
