import { useState, useMemo } from "react";
import { Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Save as SaveIcon, Cancel as CancelIcon } from "@mui/icons-material";
import ContentDivider from "../../../../../../../../../../../../components/ContentDivider";
import ContentHeader from "../../../../../../../../../../../../components/ContentHeader";
import "./style.css";

interface IProps {
    studentName: string;
    className: string;
    currentGrade: number | null;
    studentGrades: number[];
    onClose: () => void;
    onSave: (grade: number) => void;
}

const GRADE_OPTIONS = [2.0, 3.0, 3.5, 4.0, 4.5, 5.0];

export default function AssignFinalGradePopup({
    studentName,
    className,
    currentGrade,
    studentGrades,
    onClose,
    onSave,
}: IProps) {
    const [selectedGrade, setSelectedGrade] = useState<number | "">(currentGrade ?? "");

    const suggestedGrade = useMemo(() => {
        if (studentGrades.length === 0) return null;
        const mean = studentGrades.reduce((sum, grade) => sum + grade, 0) / studentGrades.length;
        return Math.round(mean * 10) / 10; // Round to 1 decimal place
    }, [studentGrades]);

    const handleSave = () => {
        if (selectedGrade !== "") {
            onSave(selectedGrade);
            onClose();
        }
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <div className="popup-background" onClick={handleCancel}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">
                    <ContentHeader title="Assign Final Grade" size="large" />
                </div>

                <ContentDivider type="line" orientation="horizontal" />

                <div className="popup-content">
                    <p className="popup-description">
                        Assign final grade to student: <strong>{studentName}</strong> in <strong>{className}</strong>
                    </p>
                    <p className="popup-suggested-grade">
                        Suggested final grade:{" "}
                        <strong>{suggestedGrade !== null ? suggestedGrade.toFixed(1) : "N/A (no grades)"}</strong>
                    </p>
                    <div className="inputs-container">
                        <div className="input-field">
                            <FormControl fullWidth required>
                                <InputLabel id="grade-label">Final Grade</InputLabel>
                                <Select
                                    labelId="grade-label"
                                    value={selectedGrade}
                                    label="Final Grade"
                                    onChange={(e) => setSelectedGrade(e.target.value as number)}
                                >
                                    {GRADE_OPTIONS.map((grade) => (
                                        <MenuItem key={grade} value={grade}>
                                            {grade.toFixed(1)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>

                <ContentDivider type="line" orientation="horizontal" />

                <div className="popup-actions">
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<CancelIcon />}
                        onClick={handleCancel}
                        className="cancel-button"
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                        disabled={selectedGrade === ""}
                        className="save-button"
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}
