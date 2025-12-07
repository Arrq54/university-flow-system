import React from "react";
import type { Course } from "../../../../hooks/useTeacherData";
import CourseWrapper from "./components/CourseWrapper";
import "./style.css";
interface IProps {
    courses: Course[];
    onFinalGradeChange: (courseId: string, classId: string, studentId: string, grade: number) => void;
    onRefresh: () => void;
}
export default function CoursesList({ courses, onFinalGradeChange, onRefresh }: IProps) {
    return (
        <div className="courses-list-in-grades">
            {courses.map((course) => (
                <CourseWrapper
                    key={course._id}
                    course={course}
                    onFinalGradeChange={onFinalGradeChange}
                    onRefresh={onRefresh}
                />
            ))}
        </div>
    );
}
