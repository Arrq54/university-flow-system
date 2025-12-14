import { useState, useMemo } from "react";
import type { Course } from "../../../../../../hooks/useTeacherData";
import ClassWrapper from "./components/ClassWrapper";
import { useGetToken } from "../../../../../../hooks/useGetToken";
import { useUsersList } from "../../../../../../hooks/useUsersList";
import { Button } from "@mui/material";
import { exportCourseToExcel as exportToExcel } from "../../../../utils/exportToExcel";

export interface StudentWithGrades {
    _id: string;
    name: string;
    grades: GradeInTable[];
    finalGrade: number | null;
}
export interface GradeInTable {
    grade: number;
    description?: string;
}
interface IProps {
    course: Course;
    onFinalGradeChange: (courseId: string, classId: string, studentId: string, grade: number) => void;
    onRefresh: () => void;
}
export default function CourseWrapper({ course, onFinalGradeChange, onRefresh }: IProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { users } = useUsersList(useGetToken() ?? "");

    const assignedStudents = useMemo(() => {
        return users.filter((user) => course.assignedStudents.includes(user._id));
    }, [users, course.assignedStudents]);

    const getStudentsWithGrades = (classItem: Course["classes"][0]): StudentWithGrades[] => {
        return assignedStudents.map((student) => {
            const grades =
                classItem.grades
                    ?.filter((g) => g.studentId === student._id)
                    .map((g) => ({ grade: g.grade, description: g.description })) ?? [];
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

    const exportCourseToExcel = () => {
        exportToExcel(course, getStudentsWithGrades);
    };
    return (
        <div className="course-wrapper">
            <div className="course-wrapper-header" onClick={() => setIsOpen(!isOpen)}>
                <span>{course.courseName}</span>
                <div className="course-wrapper-icon">
                    <Button
                        variant="contained"
                        onClick={() => {
                            exportCourseToExcel();
                        }}
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
                            courseId={course._id}
                            classItem={classItem}
                            students={getStudentsWithGrades(classItem)}
                            onFinalGradeChange={handleFinalGradeChange}
                            onRefresh={onRefresh}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
