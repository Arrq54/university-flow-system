import type { StudentCourse } from "../../../../hooks/useStudentData";
import StudentCourseGradesWrapper from "./components/StudentCourseGradesWrapper";
import "./style.css";

interface IProps {
    courses: StudentCourse[];
}

export default function CoursesList({ courses }: IProps) {
    return (
        <div className="courses-list-in-grades">
            {courses.map((course) => (
                <StudentCourseGradesWrapper key={course._id} course={course} />
            ))}
        </div>
    );
}
