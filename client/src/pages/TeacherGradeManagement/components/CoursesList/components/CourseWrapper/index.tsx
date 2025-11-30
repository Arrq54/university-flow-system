import React, { useState, useMemo } from "react";
import "./style.css";
import type { Course } from "../../../../../../hooks/useTeacherData";
import ClassWrapper from "./components/ClassWrapper";
import { useGetToken } from "../../../../../../hooks/useGetToken";
import { useUsersList } from "../../../../../../hooks/useUsersList";
import { Button } from "@mui/material";

export interface StudentWithGrades {
    _id: string;
    name: string;
    grades: number[];
    finalGrade: number | null;
}

interface IProps {
    course: Course;
    onFinalGradeChange: (courseId: string, classId: string, studentId: string, grade: number) => void;
}
export default function CourseWrapper({ course, onFinalGradeChange }: IProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { users } = useUsersList(useGetToken() ?? "");

    const assignedStudents = useMemo(() => {
        return users.filter((user) => course.assignedStudents.includes(user._id));
    }, [users, course.assignedStudents]);

    const getStudentsWithGrades = (classItem: Course["classes"][0]): StudentWithGrades[] => {
        return assignedStudents.map((student) => {
            const grades = classItem.grades?.filter((g) => g.studentId === student._id).map((g) => g.grade) ?? [];
            const finalGradeEntry = classItem.finalGrades?.find((g) => g.studentId === student._id);
            return {
                _id: student._id,
                name: student.name,
                grades,
                finalGrade: finalGradeEntry?.grade ?? null,
            };
        });
    };

    const handleFinalGradeChange = (classId: string, studentId: string, grade: number) => {
        onFinalGradeChange(course._id, classId, studentId, grade);
    };

    return (
        <div className="course-wrapper">
            <div className="course-wrapper-header" onClick={() => setIsOpen(!isOpen)}>
                <span>{course.courseName}</span>
                <div className="course-wrapper-icon">
                    <Button
                        variant="contained"
                        startIcon={
                            <img
                                src="/file-excel-2-line.svg"
                                style={{ width: 20, height: 20, filter: "var(--white-filter)" }}
                            />
                        }
                    >
                        Excel
                    </Button>

                    {isOpen ? <img src="/arrow-up-s-line.svg" alt="" /> : <img src="/arrow-down-s-line.svg" alt="" />}
                </div>
            </div>

            {isOpen && (
                <div className="course-wraper-classes-in-course">
                    {course.classes.map((classItem) => (
                        <ClassWrapper
                            key={classItem._id}
                            classItem={classItem}
                            students={getStudentsWithGrades(classItem)}
                            onFinalGradeChange={handleFinalGradeChange}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
