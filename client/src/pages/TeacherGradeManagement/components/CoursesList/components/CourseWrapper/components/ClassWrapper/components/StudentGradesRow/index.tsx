import { useState } from "react";
import type { StudentWithGrades } from "../../../..";
import AssignFinalGradePopup from "./components/AssignFinalGradePopup";
import GradesRow from "./components/GradesRow";

interface IProps {
    student: StudentWithGrades;
    className: string;
    onFinalGradeChange: (studentId: string, grade: number) => void;
}

export default function StudentGradesRow({ student, className, onFinalGradeChange }: IProps) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [gradesWrapperOpen, setGradesWrapperOpen] = useState(false);

    const handleSaveGrade = (grade: number) => {
        onFinalGradeChange(student._id, grade);
    };

    return (
        <div>
            <div className="student-grades-row" onClick={() => setGradesWrapperOpen(!gradesWrapperOpen)}>
                <span>{student.name}</span>
                <div className="grade-controls">
                    <div className="final-grade-container">
                        Final grade:
                        <div
                            className="final-grade"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsPopupOpen(true);
                            }}
                        >
                            {student.finalGrade !== null ? student.finalGrade : "-"}
                        </div>
                        {gradesWrapperOpen ? (
                            <img src="/arrow-up-s-line.svg" alt="" />
                        ) : (
                            <img src="/arrow-down-s-line.svg" alt="" />
                        )}
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
            {gradesWrapperOpen && <GradesRow student={student} />}
        </div>
    );
}
