import { useTeacherData } from "../../../../hooks/useTeacherData";
import { useUserData } from "../../../../hooks/useUserInfo";

export default function TeacherDashboard() {
    const { user } = useUserData();
    const { courses } = useTeacherData(user?._id || "");

    const findClosestClassForTeacher = () => {
        if (courses.length === 0) return { class: "No classes assigned", course: "" };

        const now = new Date();
        const currentDay = now.getDay();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentTimeInMinutes = currentHour * 60 + currentMinute;

        const dayMap: { [key: string]: number } = {
            Sunday: 0,
            Monday: 1,
            Tuesday: 2,
            Wednesday: 3,
            Thursday: 4,
            Friday: 5,
            Saturday: 6,
        };

        let closestClass: { courseName: string; className: string; diff: number; courseCode: string } | null = null;

        for (const course of courses) {
            for (const cls of course.classes) {
                const classDay = dayMap[cls.weekday];
                const [h, m] = cls.startTime.split(":").map(Number);
                const classTimeInMinutes = h * 60 + m;

                let dayDiff = classDay - currentDay;
                if (dayDiff < 0) {
                    dayDiff += 7;
                } else if (dayDiff === 0 && classTimeInMinutes <= currentTimeInMinutes) {
                    dayDiff = 7;
                }

                const diff = dayDiff * 24 * 60 + (classTimeInMinutes - currentTimeInMinutes);

                if (!closestClass || diff < closestClass.diff) {
                    closestClass = {
                        courseCode: course.courseCode,
                        courseName: course.courseName,
                        className: cls.className,
                        diff,
                    };
                }
            }
        }

        return closestClass
            ? { class: closestClass.className, course: `${closestClass.courseName} (${closestClass.courseCode})` }
            : { class: "No upcoming classes", course: "" };
    };

    const nextClass = findClosestClassForTeacher();

    return (
        <div>
            <div className="system-stats">
                <div className="stat-card">
                    <h3>Total Courses</h3>
                    <p className="stat-value">{courses.length}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Classes in Courses</h3>
                    <p className="stat-value">{courses.reduce((acc, course) => acc + course.classes.length, 0)}</p>
                </div>
            </div>
            <div className="system-stats">
                <div className="stat-card">
                    <h3>Total Students in all courses</h3>
                    <p className="stat-value">
                        {courses.reduce((acc, course) => acc + course.assignedStudents.length, 0)}
                    </p>
                </div>
            </div>

            <div className="system-stats">
                <div className="stat-card">
                    <h3>It is currently</h3>
                    <p className="stat-value">
                        {new Date().toLocaleDateString("en-US", { weekday: "long" })}:{" "}
                        {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}
                    </p>
                </div>
                <div className="stat-card">
                    <h3>Next class:</h3>
                    <p className="stat-value">{nextClass.class}</p>
                    <p className="stat-second-value">{nextClass.course}</p>
                </div>
            </div>
        </div>
    );
}
