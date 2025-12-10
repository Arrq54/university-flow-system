import { useEffect, useState } from "react";
import { SERVER_URL } from "../../../config";

export interface Conversation {
    _id: string;
    memberIds: string[];
    createdAt: string;
    updatedAt: string;
}

export function useUserConversations(token: string | null, userId: string | null) {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const refetch = () => {
        if (!token || !userId) return;
        fetchConversations();
    };

    const fetchConversations = async () => {
        if (!userId) {
            setError("User ID is required");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${SERVER_URL}/messages/list/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                const message = await res.text();
                throw new Error(message || "Failed to fetch conversations");
            }

            const data = await res.json();
            setConversations(data.conversations);
        } catch (err: any) {
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token || !userId) return;

        fetchConversations();
    }, [token, userId]);

    return { conversations, loading, error, refetch };
}
