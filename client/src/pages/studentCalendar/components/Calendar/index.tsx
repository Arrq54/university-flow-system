import { useStudentData } from "../../../../hooks/useStudentData";
import { useUserData } from "../../../../hooks/useUserInfo";
import { useGetToken } from "../../../../hooks/useGetToken";
import "./style.css";

interface ClassBlock {
    className: string;
    courseName: string;
    startTime: string;
    endTime: string;
    top: number;
    height: number;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
const START_HOUR = 7;
const END_HOUR = 21;
const HOUR_HEIGHT = 60; // pixels per hour

const timeToMinutes = (time: string): number => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
};

const getClassPosition = (startTime: string, endTime: string): { top: number; height: number } => {
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
    const startOffset = startMinutes - START_HOUR * 60;
    const duration = endMinutes - startMinutes;

    return {
        top: (startOffset / 60) * HOUR_HEIGHT,
        height: (duration / 60) * HOUR_HEIGHT,
    };
};

export default function Calendar() {
    const { user } = useUserData();
    const token = useGetToken();
    const { courses, loading, error } = useStudentData(token || null, user?._id || null);

    const getClassesForDay = (day: string): ClassBlock[] => {
        const classes: ClassBlock[] = [];

        courses.forEach((course) => {
            course.classes
                .filter((cls) => cls.weekday === day)
                .forEach((cls) => {
                    const { top, height } = getClassPosition(cls.startTime, cls.endTime);
                    classes.push({
                        className: cls.className,
                        courseName: course.courseName,
                        startTime: cls.startTime,
                        endTime: cls.endTime,
                        top,
                        height,
                    });
                });
        });

        return classes;
    };

    const hours = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i);

    if (loading) {
        return <div className="calendar-loading">Loading schedule...</div>;
    }

    if (error) {
        return <div className="calendar-loading">Error loading schedule: {error}</div>;
    }

    return (
        <div className="calendar-container">
            <h2 className="calendar-title">Your weekly schedule</h2>
            <div className="calendar">
                <div className="calendar-time-column">
                    <div style={{ height: 50 }}></div>
                    {hours.map((hour) => (
                        <div key={hour} className="calendar-time-slot">
                            <span>{hour.toString().padStart(2, "0")}:00</span>
                        </div>
                    ))}
                </div>

                {DAYS.map((day) => (
                    <div key={day} className="calendar-column">
                        <div className="calendar-header-cell">{day}</div>
                        <div className="calendar-day-body">
                            {hours.map((hour) => (
                                <div
                                    key={hour}
                                    className="calendar-hour-line"
                                    style={{ top: (hour - START_HOUR) * HOUR_HEIGHT }}
                                />
                            ))}

                            {getClassesForDay(day).map((cls, index) => (
                                <div
                                    key={index}
                                    className="calendar-class-block"
                                    style={{
                                        top: cls.top,
                                        height: cls.height,
                                    }}
                                >
                                    <div className="class-name">{cls.className}</div>
                                    <div className="class-course">{cls.courseName}</div>
                                    <div className="class-time">
                                        {cls.startTime} - {cls.endTime}
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
