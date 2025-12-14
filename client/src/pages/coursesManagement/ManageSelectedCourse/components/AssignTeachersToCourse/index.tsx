import { useState, useEffect, useMemo } from "react";
import { TextField, Button, Checkbox, InputAdornment, CircularProgress } from "@mui/material";
import { Search as SearchIcon, Save as SaveIcon, Cancel as CancelIcon } from "@mui/icons-material";
import ContentDivider from "../../../../../components/ContentDivider";
import ContentHeader from "../../../../../components/ContentHeader";
import { useUsersList } from "../../../../../hooks/useUsersList";
import type { User } from "../../../../../hooks/useUsersList";
import { useGetToken } from "../../../../../hooks/useGetToken";
import "./style.css";

interface IProps {
    onClose: () => void;
    onSave: (selectedTeacherIds: string[]) => Promise<void>;
    assignedTeachers: User[];
}

export default function AssignTeachersToCourse({ onClose, onSave, assignedTeachers }: IProps) {
    const token = useGetToken();
    const { users, loading } = useUsersList(token || null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        // Initialize selected IDs from assignedTeachers
        const initialIds = new Set(assignedTeachers.map((t) => t._id));
        setSelectedIds(initialIds);
    }, [assignedTeachers]);

    const teachers = useMemo(() => {
        return users.filter((user) => user.role === "TEACHER");
    }, [users]);

    const filteredTeachers = useMemo(() => {
        if (!searchQuery) return teachers;
        const lowerQuery = searchQuery.toLowerCase();
        return teachers.filter(
            (teacher) =>
                teacher.name.toLowerCase().includes(lowerQuery) || teacher.email.toLowerCase().includes(lowerQuery)
        );
    }, [teachers, searchQuery]);

    const handleToggleTeacher = (id: string) => {
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
                    <ContentHeader title="Assign Teachers" size="large" />
                </div>

                <ContentDivider type="line" orientation="horizontal" />

                <div className="popup-content">
                    <div className="search-container">
                        <TextField
                            fullWidth
                            placeholder="Search teachers..."
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
                        <div className="teachers-list">
                            {filteredTeachers.map((teacher) => (
                                <div
                                    key={teacher._id}
                                    className="teacher-item"
                                    onClick={() => handleToggleTeacher(teacher._id)}
                                >
                                    <Checkbox
                                        checked={selectedIds.has(teacher._id)}
                                        onChange={() => handleToggleTeacher(teacher._id)}
                                        color="primary"
                                    />
                                    <div className="teacher-info">
                                        <div className="teacher-name">
                                            {teacher.title} {teacher.name}
                                        </div>
                                        <div className="teacher-email">{teacher.email}</div>
                                    </div>
                                </div>
                            ))}
                            {filteredTeachers.length === 0 && (
                                <div
                                    style={{
                                        textAlign: "center",
                                        padding: "20px",
                                        color: "var(--light-text-secondary)",
                                    }}
                                >
                                    No teachers found
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
