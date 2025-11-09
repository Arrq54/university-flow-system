import { useState } from "react";
import { SERVER_URL } from "../../../../../../../config";
import { useGetToken } from "../../../../../../../hooks/useGetToken";

interface AddUserRequestBody {
    name: string;
    surname: string;
    email: string;
    password: string;
    title: string;
    role: string;
}

export function useAddUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const token = useGetToken();

    async function add(user: AddUserRequestBody) {
        if (!token) {
            setError("No authentication token found");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await fetch(`${SERVER_URL}/user/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(user),
            });

            if (!res.ok) {
                const message = await res.text();
                throw new Error(message || "Failed to add user");
            }

            await res.json(); // Parse response but don't need to store it
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    }

    return { add, loading, error, success };
}
