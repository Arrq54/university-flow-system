import { useState, useEffect } from "react";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Save as SaveIcon, Cancel as CancelIcon } from "@mui/icons-material";
import ContentDivider from "../../../../components/ContentDivider";
import ContentHeader from "../../../../components/ContentHeader";
import { useAddCourse } from "./hooks/useAddCourse";
import "./style.css";

interface IProps {
    onClose: () => void;
    onSuccess: () => void;
}

const courseIcons = [
    "bar-chart-grouped-fill.svg",
    "briefcase-4-line.svg",
    "calculator-fill.svg",
    "car-line.svg",
    "charging-pile-line.svg",
    "computer-line.svg",
    "cpu-line.svg",
    "formula.svg",
    "heart-line.svg",
    "hospital-line.svg",
    "pulse-ai-line.svg",
];

export default function AddCoursePopup({ onClose, onSuccess }: IProps) {
    const [courseName, setCourseName] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [icon, setIcon] = useState("");

    const { add, loading, error, success } = useAddCourse();

    useEffect(() => {
        if (success) {
            onSuccess();
            handleCancel();
        }
    }, [success]);

    const handleSave = async () => {
        await add({ courseName, courseCode, icon });
    };

    const handleCancel = () => {
        setCourseName("");
        setCourseCode("");
        setIcon("");
        onClose();
    };

    return (
        <div className="popup-background" onClick={handleCancel}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">
                    <ContentHeader title="Add New Course" size="large" />
                </div>

                <ContentDivider type="line" orientation="horizontal" />

                <div className="popup-content">
                    {error && <div className="error-message">{error}</div>}
                    <div className="inputs-container">
                        <div className="input-field">
                            <TextField
                                label="Course Name"
                                type="text"
                                variant="outlined"
                                value={courseName}
                                fullWidth
                                required
                                placeholder="e.g., Advanced Programming"
                                onChange={(e) => setCourseName(e.target.value)}
                            />
                        </div>

                        <div className="input-field">
                            <TextField
                                label="Course Code"
                                type="text"
                                variant="outlined"
                                value={courseCode}
                                fullWidth
                                required
                                placeholder="e.g., CS-101"
                                onChange={(e) => setCourseCode(e.target.value)}
                            />
                        </div>

                        <div className="input-field">
                            <FormControl fullWidth required>
                                <InputLabel id="icon-label">Course Icon</InputLabel>
                                <Select
                                    labelId="icon-label"
                                    value={icon}
                                    label="Course Icon"
                                    onChange={(e) => setIcon(e.target.value)}
                                    renderValue={(selected) => (
                                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                            <img
                                                src={`/courses/${selected}`}
                                                alt="icon"
                                                style={{ width: 24, height: 24 }}
                                            />
                                        </div>
                                    )}
                                >
                                    {courseIcons.map((iconName) => (
                                        <MenuItem key={iconName} value={iconName}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                                <img
                                                    src={`/courses/${iconName}`}
                                                    alt={iconName}
                                                    style={{ width: 24, height: 24 }}
                                                />
                                            </div>
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
                        variant="contained"
                        color="secondary"
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
                        disabled={loading || !courseName || !courseCode || !icon}
                        className="save-button"
                    >
                        {loading ? "Saving..." : "Save"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
