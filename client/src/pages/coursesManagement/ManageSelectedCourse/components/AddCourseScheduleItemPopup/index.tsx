import { useState } from "react";
import { TextField, Button, CircularProgress, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { Save as SaveIcon, Cancel as CancelIcon } from "@mui/icons-material";
import ContentDivider from "../../../../../components/ContentDivider";
import ContentHeader from "../../../../../components/ContentHeader";
import type { User } from "../../../../../hooks/useUsersList";

interface IProps {
    onClose: () => void;
    onSave: (data: {
        className: string;
        assignedTeacher: string;
        weekday: string;
        startTime: string;
        endTime: string;
    }) => Promise<void>;
    assignedTeachers: User[];
}

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function AddCourseScheduleItemPopup({ onClose, onSave, assignedTeachers }: IProps) {
    const [className, setClassName] = useState("");
    const [assignedTeacher, setAssignedTeacher] = useState("");
    const [weekday, setWeekday] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        if (!className || !assignedTeacher || !weekday || !startTime || !endTime) return;

        setSaving(true);
        try {
            await onSave({
                className,
                assignedTeacher,
                weekday,
                startTime,
                endTime,
            });
            onClose();
        } catch (error) {
            console.error("Failed to save schedule item", error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="popup-background" onClick={onClose}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">
                    <ContentHeader title="Add Schedule Item" size="large" />
                </div>

                <ContentDivider type="line" orientation="horizontal" />

                <div className="popup-content">
                    <FormControl fullWidth>
                        <InputLabel id="teacher-select-label">Assigned Teacher</InputLabel>
                        <Select
                            labelId="teacher-select-label"
                            value={assignedTeacher}
                            label="Assigned Teacher"
                            onChange={(e: SelectChangeEvent) => setAssignedTeacher(e.target.value)}
                        >
                            {assignedTeachers.map((teacher) => (
                                <MenuItem key={teacher._id} value={teacher._id}>
                                    {teacher.title} {teacher.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Class Name"
                        variant="outlined"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        placeholder="e.g. Lecture, Lab, Seminar"
                    />

                    <FormControl fullWidth>
                        <InputLabel id="weekday-select-label">Weekday</InputLabel>
                        <Select
                            labelId="weekday-select-label"
                            value={weekday}
                            label="Weekday"
                            onChange={(e: SelectChangeEvent) => setWeekday(e.target.value)}
                        >
                            {weekdays.map((day) => (
                                <MenuItem key={day} value={day}>
                                    {day}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <div style={{ display: "flex", gap: "16px" }}>
                        <TextField
                            fullWidth
                            label="Start Time"
                            type="time"
                            variant="outlined"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                        <TextField
                            fullWidth
                            label="End Time"
                            type="time"
                            variant="outlined"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                    </div>
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
                        disabled={saving || !className || !assignedTeacher || !weekday || !startTime || !endTime}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}
