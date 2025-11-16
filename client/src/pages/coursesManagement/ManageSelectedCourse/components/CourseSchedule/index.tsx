import { Button, IconButton } from "@mui/material";
import "./style.css";

export interface ScheduleItem {
    _id?: string;
    weekday: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
    startTime: string;
    endTime: string;
}

interface IProps {
    schedule: ScheduleItem[];
    onAddSchedule?: () => void;
    onEditSchedule?: (scheduleId: string) => void;
    onDeleteSchedule?: (scheduleId: string) => void;
}

const weekdayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function CourseSchedule({ schedule, onAddSchedule, onEditSchedule, onDeleteSchedule }: IProps) {
    const sortedSchedule = [...schedule].sort((a, b) => {
        const dayDiff = weekdayOrder.indexOf(a.weekday) - weekdayOrder.indexOf(b.weekday);
        if (dayDiff !== 0) return dayDiff;
        return a.startTime.localeCompare(b.startTime);
    });

    const getWeekdayColor = (weekday: string) => {
        const colors: { [key: string]: string } = {
            Monday: "#EF4444",
            Tuesday: "#F59E0B",
            Wednesday: "#10B981",
            Thursday: "#3B82F6",
            Friday: "#8B5CF6",
            Saturday: "#EC4899",
            Sunday: "#6B7280",
        };
        return colors[weekday] || "#6B7280";
    };

    return (
        <div className="course-schedule-section">
            <div className="section-header">
                <h2>Course Schedule</h2>
                {onAddSchedule && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onAddSchedule}
                        endIcon={
                            <img
                                src="/add-line.svg"
                                alt=""
                                style={{ width: 20, height: 20, filter: "var(--white-filter)" }}
                            />
                        }
                    >
                        Add
                    </Button>
                )}
            </div>

            {sortedSchedule.length === 0 ? (
                <div className="empty-state">
                    <p>No schedule set for this course yet.</p>
                    {onAddSchedule && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onAddSchedule}
                            endIcon={
                                <img
                                    src="/add-line.svg"
                                    alt=""
                                    style={{ width: 20, height: 20, filter: "var(--white-filter)" }}
                                />
                            }
                        >
                            Add
                        </Button>
                    )}
                </div>
            ) : (
                <div className="schedule-grid">
                    {sortedSchedule.map((item, index) => (
                        <div key={item._id || index} className="schedule-card">
                            <div
                                className="schedule-weekday-bar"
                                style={{ backgroundColor: getWeekdayColor(item.weekday) }}
                            />
                            <div className="schedule-content">
                                <div className="schedule-info">
                                    <h3 className="schedule-weekday">{item.weekday}</h3>
                                    <div className="schedule-time">
                                        <span className="time-badge">{item.startTime}</span>
                                        <span className="time-separator">:</span>
                                        <span className="time-badge">{item.endTime}</span>
                                    </div>
                                </div>
                                <div className="schedule-actions">
                                    {onEditSchedule && (
                                        <IconButton
                                            aria-label=""
                                            onClick={() => onEditSchedule(item._id || "")}
                                            className="edit-button"
                                        >
                                            <img
                                                src="/pencil-line.svg"
                                                alt="Edit Schedule"
                                                style={{ width: 20, height: 20 }}
                                            />
                                        </IconButton>
                                    )}
                                    {onDeleteSchedule && (
                                        <IconButton
                                            aria-label=""
                                            onClick={() => onDeleteSchedule(item._id || "")}
                                            className="delete-button"
                                        >
                                            <img
                                                src="/delete-bin-line.svg"
                                                alt="Delete Schedule"
                                                style={{ width: 20, height: 20 }}
                                            />
                                        </IconButton>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
