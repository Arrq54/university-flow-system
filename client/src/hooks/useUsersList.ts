import { useEffect, useState } from "react";
import { SERVER_URL } from "../config";

export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    title: string;
    role: string;
}

export function useUsersList(token: string | null) {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token) return;

        const fetchUsers = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(`${SERVER_URL}/user/get/all`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    const message = await res.text();
                    throw new Error(message || "Failed to fetch users");
                }

                const data = await res.json();
                setUsers(data);
            } catch (err: any) {
                setError(err.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [token]);

    return { users, loading, error };
}
