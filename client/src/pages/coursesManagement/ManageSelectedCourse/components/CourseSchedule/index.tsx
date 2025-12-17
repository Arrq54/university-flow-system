import { Button, IconButton } from "@mui/material";
import "./style.css";
import type { User } from "../../../../../hooks/useUsersList";

export interface ScheduleItem {
    _id?: string;
    className: string;
    assignedTeacher: string;
    weekday: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
    startTime: string;
    endTime: string;
}

interface IProps {
    schedule: ScheduleItem[];
    teachers: User[];
    onAddSchedule?: () => void;
    onDeleteSchedule?: (scheduleId: string) => void;
}

const weekdayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function CourseSchedule({ schedule, teachers, onAddSchedule, onDeleteSchedule }: IProps) {
    const scheduleByDay = weekdayOrder.reduce((acc, day) => {
        acc[day] = schedule
            .filter((item) => item.weekday === day)
            .sort((a, b) => a.startTime.localeCompare(b.startTime));
        return acc;
    }, {} as { [key: string]: ScheduleItem[] });

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

    const getTeacherNameById = (teacherId: string) => {
        console.log(teachers);
        console.log(teacherId);
        const teacher = teachers.find((t) => t._id === teacherId);
        if (!teacher) return "";
        return teacher?.name;
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

            <div className="calendar-grid">
                {weekdayOrder.map((day) => (
                    <div key={day} className="calendar-day-column">
                        <div className="calendar-day-header" style={{ borderTopColor: getWeekdayColor(day) }}>
                            {day}
                        </div>
                        <div className="calendar-day-content">
                            {scheduleByDay[day].map((item, index) => (
                                <div key={item._id || index} className="calendar-class-card">
                                    <div className="class-time">
                                        {item.startTime} - {item.endTime}
                                    </div>
                                    <div className="class-name">{item.className}</div>
                                    <div className="class-teacher">{getTeacherNameById(item.assignedTeacher)}</div>
                                    <div className="class-actions">
                                        {onDeleteSchedule && (
                                            <IconButton size="small" onClick={() => onDeleteSchedule(item._id || "")}>
                                                <img
                                                    src="/delete-bin-line.svg"
                                                    alt="Delete"
                                                    style={{ width: 16, height: 16, filter: "var(--black-filter)" }}
                                                />
                                            </IconButton>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
