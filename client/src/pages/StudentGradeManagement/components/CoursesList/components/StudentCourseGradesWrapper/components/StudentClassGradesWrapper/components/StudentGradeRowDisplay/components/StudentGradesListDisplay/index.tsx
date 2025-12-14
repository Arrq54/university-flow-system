import "./style.css";
import type { Schedule } from "../../../../../../../../../../../../hooks/useStudentData";
import { useUserData } from "../../../../../../../../../../../../hooks/useUserInfo";

interface IProps {
    classItem: Schedule;
}

export default function StudentGradesListDisplay({ classItem }: IProps) {
    const { user } = useUserData();
    return (
        <div className="grades-row">
            {classItem.grades
                .filter((gradeEntry) => gradeEntry.studentId === user?._id)
                .map((gradeEntry, index) => (
                    <div key={index} className="grade-entry">
                        <span className="grade-description">{gradeEntry.description || "Grade"}</span>
                        <span className="grade-value">{gradeEntry.grade}</span>
                    </div>
                ))}
            {classItem.grades.length === 0 && <div className="no-grades-entry">No grades available</div>}
        </div>
    );
}
