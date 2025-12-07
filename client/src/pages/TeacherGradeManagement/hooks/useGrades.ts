import { useState } from "react";
import { useGetToken } from "../../../hooks/useGetToken";
import { SERVER_URL } from "../../../config";

interface GradeEntry {
    studentId: string;
    grade: number | null;
}

interface AddGradesRequestBody {
    courseId: string;
    classId: string;
    description: string;
    grades: GradeEntry[];
}

export function useGrades() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const token = useGetToken();

    async function addGrades(payload: AddGradesRequestBody) {
        if (!token) {
            setError("No authentication token found");
            return false;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await fetch(`${SERVER_URL}/course/${payload.courseId}/class/${payload.classId}/grades`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    description: payload.description,
                    grades: payload.grades,
                }),
            });

            if (!res.ok) {
                const message = await res.text();
                throw new Error(message || "Failed to add grades");
            }

            await res.json();
            setSuccess(true);
            return true;
        } catch (err: any) {
            setError(err.message || "Unknown error");
            return false;
        } finally {
            setLoading(false);
        }
    }

    return { addGrades, loading, error, success };
}
