import { useEffect, useState } from "react";
import { SERVER_URL } from "../../../config";

export interface Course {
    _id: string;
    courseName: string;
    courseCode: string;
    icon: string;
}

export function useCoursesList(token: string | null) {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const refetch = () => {
        if (!token) return;
        fetchCourses();
    };
    const fetchCourses = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${SERVER_URL}/course/get/all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                const message = await res.text();
                throw new Error(message || "Failed to fetch courses");
            }

            const data = await res.json();
            setCourses(data.data);
        } catch (err: any) {
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) return;

        fetchCourses();
    }, [token]);

    return { courses, loading, error, refetch };
}
