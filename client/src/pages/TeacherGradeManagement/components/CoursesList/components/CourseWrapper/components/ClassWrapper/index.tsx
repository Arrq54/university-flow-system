import { useState } from "react";
import type { Schedule } from "../../../../../../../../hooks/useTeacherData";
import type { StudentWithGrades } from "../../index";
import StudentGradesRow from "./components/StudentGradesRow";
import AddGradesPopup from "./components/AddGradesPopup";
import { useGrades } from "../../../../../../hooks/useGrades";
import { IconButton } from "@mui/material";

interface IProps {
    courseId: string;
    classItem: Schedule;
    students: StudentWithGrades[];
    onFinalGradeChange: (classId: string, studentId: string, grade: number) => void;
    onRefresh: () => void;
}

export default function ClassWrapper({ courseId, classItem, students, onFinalGradeChange, onRefresh }: IProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [showGradesPopup, setShowGradesPopup] = useState(false);
    const { addGrades } = useGrades();

    const handleFinalGradeChange = (studentId: string, grade: number) => {
        onFinalGradeChange(classItem._id!, studentId, grade);
    };

    const showAddGradesPopup = () => {
        setShowGradesPopup(true);
    };

    const handleGradesPopupClose = () => {
        setShowGradesPopup(false);
    };

    const handleGradesSave = async (payload: {
        description: string;
        grades: Array<{ studentId: string; grade: number | null }>;
    }) => {
        const success = await addGrades({
            courseId,
            classId: classItem._id!,
            description: payload.description,
            grades: payload.grades,
        });
        if (success) {
            onRefresh();
            handleGradesPopupClose();
        }
    };

    return (
        <div className="class-wrapper-in-grades">
            <div className="class-wrapper-header" onClick={() => setIsOpen(!isOpen)}>
                <span>{classItem.className}</span>
                <div className="flex class-wrapper-controls">
                    <IconButton
                        aria-label=""
                        onClick={(e) => {
                            e.stopPropagation();
                            showAddGradesPopup();
                        }}
                        className="remove-button"
                    >
                        <img src="/add-line.svg" alt="Show Password" style={{ width: 20, height: 20 }} />
                    </IconButton>
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
            {showGradesPopup && (
                <AddGradesPopup students={students} onClose={handleGradesPopupClose} onSave={handleGradesSave} />
            )}
        </div>
    );
}
