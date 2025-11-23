import { useEffect, useState } from "react";
import { SERVER_URL } from "../config";
import type { User } from "./useUsersList";

export interface Course {
    _id: string;
    courseName: string;
    courseCode: string;
    icon: string;
    assignedStudents: User[];
    assignedTeachers: User[];
    classes: any[];
    createdAt: string;
    updatedAt: string;
}

export function useCourseData(token: string | null, courseCode: string | undefined) {
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const refetch = () => {
        if (!token || !courseCode) return;
        fetchCourse();
    };

    const fetchCourse = async () => {
        if (!courseCode) {
            setError("Course code is required");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${SERVER_URL}/course/get/${courseCode}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                const message = await res.text();
                throw new Error(message || "Failed to fetch course");
            }

            const data = await res.json();
            setCourse(data.data);
        } catch (err: any) {
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token || !courseCode) return;

        fetchCourse();
    }, [token, courseCode]);

    return { course, loading, error, refetch };
}
