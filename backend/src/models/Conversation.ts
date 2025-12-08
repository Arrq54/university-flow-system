import mongoose, { Schema, Document } from "mongoose";

export interface IConversation extends Document {
    memberIds: string[];
}

const conversationSchema = new Schema<IConversation>(
    {
        memberIds: { type: [String], required: true },
    },
    { timestamps: true }
);

export const Conversation = mongoose.model<IConversation>("Conversation", conversationSchema);
