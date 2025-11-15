import { useState } from "react";
import { SERVER_URL } from "../../../../../config";
import { useGetToken } from "../../../../../hooks/useGetToken";

interface AddCourseRequestBody {
    courseName: string;
    courseCode: string;
    icon: string;
}

export function useAddCourse() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const token = useGetToken();

    async function add(course: AddCourseRequestBody) {
        if (!token) {
            setError("No authentication token found");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await fetch(`${SERVER_URL}/course/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(course),
            });

            if (!res.ok) {
                const message = await res.text();
                throw new Error(message || "Failed to add course");
            }

            await res.json();
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    }

    return { add, loading, error, success };
}
