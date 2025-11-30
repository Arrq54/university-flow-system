import React, { useState } from "react";
import "./style.css";
import type { Schedule } from "../../../../../../../../hooks/useTeacherData";
import type { StudentWithGrades } from "../../index";
import StudentGradesRow from "./components/StudentGradesRow";

interface IProps {
    classItem: Schedule;
    students: StudentWithGrades[];
    onFinalGradeChange: (classId: string, studentId: string, grade: number) => void;
}
export default function ClassWrapper({ classItem, students, onFinalGradeChange }: IProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleFinalGradeChange = (studentId: string, grade: number) => {
        onFinalGradeChange(classItem._id!, studentId, grade);
    };

    return (
        <div className="class-wrapper-in-grades">
            <div className="class-wrapper-header" onClick={() => setIsOpen(!isOpen)}>
                <span>{classItem.className}</span>
                <div className="class-wrapper-header-icon">
                    {isOpen ? <img src="/arrow-up-s-line.svg" alt="" /> : <img src="/arrow-down-s-line.svg" alt="" />}
                </div>
            </div>
            {isOpen && (
                <div className="class-wrapper-content">
                    <div className="class-wrapper-students">
                        {students.map((student) => (
                            <StudentGradesRow
                                key={student._id}
                                student={student}
                                className={classItem.className}
                                onFinalGradeChange={handleFinalGradeChange}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
