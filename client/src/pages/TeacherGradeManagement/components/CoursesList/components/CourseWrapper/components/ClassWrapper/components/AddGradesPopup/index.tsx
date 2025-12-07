import { useState, useMemo } from "react";
import { Button, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import "./style.css";
import SearchBar from "../../../../../../../../../../components/SearchBar";
import type { GradeInTable } from "../../../..";

interface StudentWithGrades {
    _id: string;
    name: string;
    grades: GradeInTable[];
    finalGrade: number | null;
}

interface IProps {
    students: StudentWithGrades[];
    onClose: () => void;
    onSave: (payload: { description: string; grades: GradeAssignment[] }) => void;
}

interface GradeAssignment {
    studentId: string;
    grade: number | null;
}

const GRADE_OPTIONS = [2.0, 3.0, 3.5, 4.0, 4.5, 5.0];

export default function AddGradesPopup({ students, onClose, onSave }: IProps) {
    const [description, setDescription] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [grades, setGrades] = useState<GradeAssignment[]>(
        students.map((student) => ({
            studentId: student._id,
            grade: null,
        }))
    );

    const filteredStudents = useMemo(() => {
        return students.filter((student) => student.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [students, searchQuery]);

    const handleGradeChange = (studentId: string, grade: number | null) => {
        setGrades((prevGrades) => prevGrades.map((g) => (g.studentId === studentId ? { ...g, grade } : g)));
    };

    const handleSave = () => {
        onSave({
            description,
            grades,
        });
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    const atLeastOne = grades.some((g) => g.grade !== null);

    return (
        <div className="popup-background" onClick={handleCancel}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">
                    <h2 className="popup-title">Add Grades to Students</h2>
                </div>

                <div className="popup-divider"></div>

                <div className="popup-content">
                    <div className="description-input">
                        <TextField
                            label="Grade Description (e.g., Test #1)"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="search-input">
                        <SearchBar value={searchQuery} onChange={setSearchQuery} />
                    </div>

                    <div className="students-scrollbox">
                        {filteredStudents.map((student) => {
                            const studentGrade = grades.find((g) => g.studentId === student._id);
                            const selectedGrade = studentGrade?.grade;

                            return (
                                <div key={student._id} className="student-grade-item">
                                    <div className="student-info">
                                        <span className="student-name">{student.name}</span>
                                    </div>

                                    <div className="student-grade-select">
                                        <FormControl className="grade-select-control">
                                            <InputLabel id={`grade-label-${student._id}`}>Grade</InputLabel>
                                            <Select
                                                labelId={`grade-label-${student._id}`}
                                                value={selectedGrade ?? ""}
                                                label="Grade"
                                                onChange={(e) => {
                                                    const value = e.target.value as unknown as string;
                                                    handleGradeChange(
                                                        student._id,
                                                        value === "" ? null : (value as unknown as number)
                                                    );
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {GRADE_OPTIONS.map((grade) => (
                                                    <MenuItem key={grade} value={grade}>
                                                        {grade.toFixed(1)}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="popup-divider"></div>

                <div className="popup-actions">
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={handleSave} disabled={!atLeastOne}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}
