import { useState } from "react";
import "./style.css";
import type { Schedule } from "../../../../../../../../hooks/useStudentData";
import StudentGradeRowDisplay from "./components/StudentGradeRowDisplay";

interface IProps {
    classItem: Schedule;
}

export default function StudentClassGradesWrapper({ classItem }: IProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="class-wrapper-in-grades">
            <div className="class-wrapper-header" onClick={() => setIsOpen(!isOpen)}>
                <span>{classItem.className}</span>
                <div className="flex class-wrapper-controls">
                    <div className="class-wrapper-header-icon">
                        {isOpen ? (
                            <img src="/arrow-up-s-line.svg" alt="" />
                        ) : (
                            <img src="/arrow-down-s-line.svg" alt="" />
                        )}
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="class-wrapper-content">
                    <div className="class-wrapper-students">
                        <StudentGradeRowDisplay classItem={classItem} />
                    </div>
                </div>
            )}
        </div>
    );
}
