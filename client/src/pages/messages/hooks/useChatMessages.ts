import { useEffect, useState } from "react";
import { SERVER_URL } from "../../../config";

export interface Message {
    _id: string;
    conversationId: string;
    senderId: string;
    content: string;
    timestamp: string;
    readBy: string[];
    createdAt: string;
    updatedAt: string;
}

export function useChatMessages(token: string | null, conversationId: string | null) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const refetch = () => {
        if (!token || !conversationId) return;
        fetchMessages();
    };

    const fetchMessages = async () => {
        if (!conversationId) {
            setError("Conversation ID is required");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${SERVER_URL}/messages/${conversationId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                const message = await res.text();
                throw new Error(message || "Failed to fetch messages");
            }

            const data = await res.json();
            setMessages(data.messages);
        } catch (err: any) {
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token || !conversationId) return;

        fetchMessages();
    }, [token, conversationId]);

    return { messages, loading, error, refetch };
}
