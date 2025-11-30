import { useState, useEffect, useCallback } from "react";
import { SERVER_URL } from "../config";
import { useGetToken } from "./useGetToken";

export interface Schedule {
    _id?: string;
    assignedTeacher: string;
    className: string;
    weekday: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
    startTime: string;
    endTime: string;
    grades: {
        studentId: string;
        grade: number;
        description?: string;
    }[];
    finalGrades: {
        studentId: string;
        grade: number;
    }[];
}

export interface Course {
    _id: string;
    courseName: string;
    courseCode: string;
    icon: string;
    assignedStudents: string[];
    assignedTeachers: string[];
    classes: Schedule[];
    createdAt: string;
    updatedAt: string;
}

export const useTeacherData = (teacherId: string) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const token = useGetToken();

    const fetchTeacherData = useCallback(async () => {
        if (!teacherId || !token) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`${SERVER_URL}/teacher/get/${teacherId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch teacher data");
            }

            const data = await response.json();
            setCourses(data.courses);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [teacherId, token]);

    useEffect(() => {
        fetchTeacherData();
    }, [fetchTeacherData]);

    const refetch = () => {
        fetchTeacherData();
    };

    return { courses, loading, error, refetch };
};
