import { useState } from "react";
import "./style.css";
import type { StudentWithGrades } from "../../../..";
import AssignFinalGradePopup from "./components/AssignFinalGradePopup";

interface IProps {
    student: StudentWithGrades;
    className: string;
    onFinalGradeChange: (studentId: string, grade: number) => void;
}

export default function StudentGradesRow({ student, className, onFinalGradeChange }: IProps) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleSaveGrade = (grade: number) => {
        onFinalGradeChange(student._id, grade);
    };

    return (
        <div className="student-grades-row">
            <span>{student.name}</span>
            <div className="grade-controls">
                <div></div>
                <div className="final-grade-container">
                    Final:
                    <div className="final-grade" onClick={() => setIsPopupOpen(true)}>
                        {student.finalGrade !== null ? student.finalGrade : "+"}
                    </div>
                </div>
            </div>

            {isPopupOpen && (
                <AssignFinalGradePopup
                    studentName={student.name}
                    className={className}
                    currentGrade={student.finalGrade}
                    studentGrades={student.grades}
                    onClose={() => setIsPopupOpen(false)}
                    onSave={handleSaveGrade}
                />
            )}
        </div>
    );
}
