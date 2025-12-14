import { useState, useEffect } from "react";
import { SERVER_URL } from "../config";

export interface StudentGrade {
    studentId: string;
    grade: number;
    description?: string;
}

export interface FinalGrade {
    studentId: string;
    grade: number;
}

export interface Schedule {
    _id?: string;
    assignedTeacher: string;
    className: string;
    weekday: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
    startTime: string;
    endTime: string;
    grades: StudentGrade[];
    finalGrades: FinalGrade[];
}

export interface StudentCourse {
    _id: string;
    courseName: string;
    courseCode: string;
    icon: string;
    classes: Schedule[];
}

export function useStudentData(token: string | null, studentId: string | null) {
    const [courses, setCourses] = useState<StudentCourse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchStudentCourses = async () => {
        if (!token || !studentId) return;

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
            const studentCourses = data.data.filter((course: any) => course.assignedStudents.includes(studentId));
            setCourses(studentCourses);
        } catch (err: any) {
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token && studentId) {
            fetchStudentCourses();
        }
    }, [token, studentId]);

    const refetch = () => {
        fetchStudentCourses();
    };

    const getAverageGradeForCourse = (course: StudentCourse): number | null => {
        const allGrades: number[] = [];

        for (const cls of course.classes) {
            for (const grade of cls.grades) {
                if (grade.studentId === studentId) {
                    allGrades.push(grade.grade);
                }
            }
        }

        if (allGrades.length === 0) return null;
        return allGrades.reduce((a, b) => a + b, 0) / allGrades.length;
    };

    const getOverallAverageGrade = (): number | null => {
        const allGrades: number[] = [];

        for (const course of courses) {
            for (const cls of course.classes) {
                for (const grade of cls.grades) {
                    if (grade.studentId === studentId) {
                        allGrades.push(grade.grade);
                    }
                }
            }
        }

        if (allGrades.length === 0) return null;
        return allGrades.reduce((a, b) => a + b, 0) / allGrades.length;
    };

    const getFinalGradeForCourse = (course: StudentCourse): number | null => {
        for (const cls of course.classes) {
            const finalGrade = cls.finalGrades.find((fg) => fg.studentId === studentId);
            if (finalGrade) return finalGrade.grade;
        }
        return null;
    };

    return {
        courses,
        loading,
        error,
        refetch,
        getAverageGradeForCourse,
        getOverallAverageGrade,
        getFinalGradeForCourse,
    };
}
