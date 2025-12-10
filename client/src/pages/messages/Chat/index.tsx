import React from "react";
import { useChatMessages } from "../hooks/useChatMessages";
import { useGetToken } from "../../../hooks/useGetToken";
import { useUsersList } from "../../../hooks/useUsersList";
import "./style.css";
interface IProps {
    chatId: string;
}
export default function Chat({ chatId }: IProps) {
    const token = useGetToken();
    const { messages } = useChatMessages(token ?? null, chatId);
    const { users } = useUsersList(token ?? null);
    const getSenderName = (senderId: string) => {
        return users.find((user) => user._id === senderId)?.name || "Unknown";
    };
    return (
        <div className="messages">
            {messages.map((message) => (
                <div key={message._id} className="message">
                    <div className="message-header">
                        <span>{getSenderName(message.senderId)}</span>
                        <span>{new Date(message.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="message-content">{message.content}</div>
                </div>
            ))}
        </div>
    );
}
