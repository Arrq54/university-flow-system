import { useState, useEffect, useRef } from "react";
import { useChatMessages } from "../hooks/useChatMessages";
import { useGetToken } from "../../../hooks/useGetToken";
import { useUsersList } from "../../../hooks/useUsersList";
import "./style.css";
import { IconButton, TextField } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { SERVER_URL } from "../../../config";

interface IProps {
    chatId: string;
}

export default function Chat({ chatId }: IProps) {
    const token = useGetToken();
    const { messages, refetch } = useChatMessages(token ?? null, chatId);
    const { users } = useUsersList(token ?? null);
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const getSenderName = (senderId: string) => {
        return users.find((user) => user._id === senderId)?.name || "Unknown";
    };

    const handleSend = async () => {
        if (!token || !message.trim()) return;
        setSending(true);
        try {
            const res = await fetch(`${SERVER_URL}/messages/${chatId}/message`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    content: message,
                }),
            });

            if (res.ok) {
                setMessage("");
                refetch();
            }
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="messages">
            {messages.map((msg) => (
                <div key={msg._id} className="message">
                    <div className="message-header">
                        <span>{getSenderName(msg.senderId)}</span>
                        <span>{new Date(msg.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="message-content">{msg.content}</div>
                </div>
            ))}
            <div ref={messagesEndRef} />

            <div className="message-input">
                <TextField
                    label="Message"
                    multiline
                    rows={2}
                    variant="outlined"
                    fullWidth
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                />
                <IconButton onClick={handleSend} className="send-button" disabled={sending || !message.trim()}>
                    <SendIcon />
                </IconButton>
            </div>
        </div>
    );
}
