import { useStudentData } from "../../../../hooks/useStudentData";
import { useGetToken } from "../../../../hooks/useGetToken";
import { useUserData } from "../../../../hooks/useUserInfo";

export default function StudentDashboard() {
    const { user } = useUserData();
    const studentCourses = useStudentData(useGetToken() || null, user?._id || null);

    const calculateAverageGrade = (userId: string, courseCode: string) => {
        let totalGrades = 0;
        let gradeCount = 0;

        studentCourses.courses.forEach((course) => {
            if (course.courseCode !== courseCode) return;
            course.classes.forEach((cls) => {
                cls.finalGrades.forEach((grade) => {
                    if (grade.studentId === userId) {
                        totalGrades += grade.grade;
                        gradeCount += 1;
                    }
                });
            });
        });
        return gradeCount === 0 ? null : totalGrades / gradeCount;
    };

    const findClosestClassForStudent = () => {
        if (studentCourses.courses.length === 0) return { class: "No classes assigned", course: "" };

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

        for (const course of studentCourses.courses) {
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

    const nextClass = findClosestClassForStudent();

    return (
        <div>
            <div>
                <div className="system-stats">
                    <div className="stat-card">
                        <h3>Next class:</h3>
                        <p className="stat-value">{nextClass.class}</p>
                        <p className="stat-second-value">{nextClass.course}</p>
                    </div>
                </div>
                <div className="system-stats">
                    <div className="stat-card">
                        <h3>You are assigned to: </h3>
                        <p className="stat-value">{studentCourses.courses.length} courses</p>
                    </div>
                    <div className="stat-card">
                        <h3>And total</h3>
                        <p className="stat-value">
                            {studentCourses.courses.reduce((acc, course) => acc + course.classes.length, 0)} classes
                        </p>
                    </div>
                </div>
                <div className="system-stats">
                    <div className="stat-card">
                        <h3>Your average final grades: </h3>
                        {studentCourses.courses.map((course) => (
                            <p key={course.courseCode} className="stat-value">
                                {course.courseName} ({course.courseCode}):{" "}
                                {calculateAverageGrade(user?._id || "", course.courseCode) ?? "N/A"}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
