import type { StudentWithGrades } from "../../../../../..";
import "./style.css";

interface IProps {
    student: StudentWithGrades;
}

export default function GradesRow({ student }: IProps) {
    return (
        <div className="grades-row">
            {student.grades.map((gradeEntry, index) => (
                <div key={index} className="grade-entry">
                    <span className="grade-description">{gradeEntry.description}</span>

                    <span className="grade-value">{gradeEntry.grade}</span>
                </div>
            ))}
            {student.grades.length === 0 && <div className="no-grades-entry">No grades available</div>}
        </div>
    );
}
