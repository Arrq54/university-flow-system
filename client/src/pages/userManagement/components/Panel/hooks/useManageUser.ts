import { useState } from "react";
import { useGetToken } from "../../../../../hooks/useGetToken";
import { SERVER_URL } from "../../../../../config";

interface AddUserRequestBody {
    name: string;
    email: string;
    password: string;
    title: string;
    role: string;
}

export function useManageUser() {
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

            await res.json();
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    }
    async function edit(_id: string, user: AddUserRequestBody) {
        if (!token) {
            setError("No authentication token found");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await fetch(`${SERVER_URL}/user/edit`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ _id, user }),
            });

            if (!res.ok) {
                const message = await res.text();
                throw new Error(message || "Failed to add user");
            }

            await res.json();
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    }

    const remove = async (userId: string) => {
        if (!token) {
            setError("No authentication token found");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await fetch(`${SERVER_URL}/user/delete/${userId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                const message = await res.text();
                throw new Error(message || "Failed to delete user");
            }

            await res.json();
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    return { add, edit, remove, loading, error, success };
}
