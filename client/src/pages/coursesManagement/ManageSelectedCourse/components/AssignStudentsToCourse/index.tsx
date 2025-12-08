import { useState, useEffect, useMemo } from "react";
import { TextField, Button, Checkbox, InputAdornment, CircularProgress } from "@mui/material";
import { Search as SearchIcon, Save as SaveIcon, Cancel as CancelIcon } from "@mui/icons-material";
import ContentDivider from "../../../../../components/ContentDivider";
import ContentHeader from "../../../../../components/ContentHeader";
import { useUsersList } from "../../../../../hooks/useUsersList";
import type { User } from "../../../../../hooks/useUsersList";
import { useGetToken } from "../../../../../hooks/useGetToken";

interface IProps {
    onClose: () => void;
    onSave: (selectedStudentIds: string[]) => Promise<void>;
    assignedStudents: User[];
}

export default function AssignStudentsToCourse({ onClose, onSave, assignedStudents }: IProps) {
    const token = useGetToken();
    const { users, loading } = useUsersList(token || null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        // Initialize selected IDs from assignedStudents
        const initialIds = new Set(assignedStudents.map((s) => s._id));
        setSelectedIds(initialIds);
    }, [assignedStudents]);

    const students = useMemo(() => {
        return users.filter((user) => user.role === "STUDENT");
    }, [users]);

    const filteredStudents = useMemo(() => {
        if (!searchQuery) return students;
        const lowerQuery = searchQuery.toLowerCase();
        return students.filter(
            (student) =>
                student.name.toLowerCase().includes(lowerQuery) || student.email.toLowerCase().includes(lowerQuery)
        );
    }, [students, searchQuery]);

    const handleToggleStudent = (id: string) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await onSave(Array.from(selectedIds));
            onClose();
        } catch (error) {
            console.error("Failed to save assignments", error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="popup-background" onClick={onClose}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">
                    <ContentHeader title="Assign Students" size="large" />
                </div>

                <ContentDivider type="line" orientation="horizontal" />

                <div className="popup-content">
                    <div className="search-container">
                        <TextField
                            fullWidth
                            placeholder="Search students..."
                            variant="outlined"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>

                    {loading ? (
                        <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
                            <CircularProgress />
                        </div>
                    ) : (
                        <div className="students-list">
                            {filteredStudents.map((student) => (
                                <div
                                    key={student._id}
                                    className="student-item"
                                    onClick={() => handleToggleStudent(student._id)}
                                >
                                    <Checkbox
                                        checked={selectedIds.has(student._id)}
                                        onChange={() => handleToggleStudent(student._id)}
                                        color="primary"
                                    />
                                    <div className="student-info">
                                        <div className="student-name">
                                            {student.name} {student.surname}
                                        </div>
                                        <div className="student-email">{student.email}</div>
                                    </div>
                                </div>
                            ))}
                            {filteredStudents.length === 0 && (
                                <div
                                    style={{
                                        textAlign: "center",
                                        padding: "20px",
                                        color: "var(--light-text-secondary)",
                                    }}
                                >
                                    No students found
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="popup-actions">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={onClose}
                        startIcon={<CancelIcon />}
                        disabled={saving}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                        disabled={saving}
                    >
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    );
}
