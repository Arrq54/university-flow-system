import React from "react";
import type { StudentWithGrades } from "../../../../../..";
import { IconButton } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
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
        </div>
    );
}
