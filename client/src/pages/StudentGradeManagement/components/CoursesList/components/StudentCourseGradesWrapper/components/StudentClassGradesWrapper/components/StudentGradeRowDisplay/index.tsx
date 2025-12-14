import { useState } from "react";
import "./style.css";
import type { Schedule } from "../../../../../../../../../../hooks/useStudentData";
import StudentGradesListDisplay from "./components/StudentGradesListDisplay";

interface IProps {
    classItem: Schedule;
}

export default function StudentGradeRowDisplay({ classItem }: IProps) {
    const [gradesWrapperOpen, setGradesWrapperOpen] = useState(false);

    // Get final grade from the current schedule
    const finalGrade = classItem.finalGrades.length > 0 ? classItem.finalGrades[0].grade : null;

    return (
        <div>
            <div className="student-grades-row" onClick={() => setGradesWrapperOpen(!gradesWrapperOpen)}>
                <span>{classItem.className}</span>
                <div className="grade-controls">
                    <div className="final-grade-container">
                        Final grade:
                        <div className="final-grade">{finalGrade !== null ? finalGrade : "-"}</div>
                        {gradesWrapperOpen ? (
                            <img src="/arrow-up-s-line.svg" alt="" />
                        ) : (
                            <img src="/arrow-down-s-line.svg" alt="" />
                        )}
                    </div>
                </div>
            </div>
            {gradesWrapperOpen && <StudentGradesListDisplay classItem={classItem} />}
        </div>
    );
}
