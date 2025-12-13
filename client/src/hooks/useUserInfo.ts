import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { SERVER_URL } from "../config";
import { useGetToken } from "./useGetToken";

export interface UserData {
    _id: string;
    name: string;
    email: string;
    role: "STUDENT" | "TEACHER" | "ADMIN";
}

export function useUserData() {
    const [user, setUser] = useState<UserData | null>();

    const [loading, setLoading] = useState(!user);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) return;

        const token = useGetToken();
        if (!token) {
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${SERVER_URL}/user/info`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error("Failed to fetch user data");

                const data = await res.json();
                setUser(data.user);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [user]);

    const clearUser = () => {
        setUser(null);
        Cookies.remove("token");
    };

    return { user, setUser, clearUser, loading, error };
}
