import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
    conversationId: string;
    senderId: string;
    content: string;
    timestamp: Date;
    readBy: string[];
}

const messageSchema = new Schema<IMessage>(
    {
        conversationId: { type: String, required: true, index: true },
        senderId: { type: String, required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        readBy: { type: [String], default: [] },
    },
    { timestamps: true }
);

export const Message = mongoose.model<IMessage>("Message", messageSchema);
