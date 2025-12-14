import "./style.css";
import { useState } from "react";
import type { StudentCourse } from "../../../../../../hooks/useStudentData";
import StudentClassGradesWrapper from "./components/StudentClassGradesWrapper";

interface IProps {
    course: StudentCourse;
}

export default function StudentCourseGradesWrapper({ course }: IProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="course-wrapper">
            <div className="course-wrapper-header" onClick={() => setIsOpen(!isOpen)}>
                <span>{course.courseName}</span>
                <div className="course-wrapper-icon">
                    {isOpen ? <img src="/arrow-up-s-line.svg" alt="" /> : <img src="/arrow-down-s-line.svg" alt="" />}
                </div>
            </div>

            {isOpen && (
                <div className="course-wraper-classes-in-course">
                    {course.classes.map((classItem) => (
                        <StudentClassGradesWrapper key={classItem._id} classItem={classItem} />
                    ))}
                </div>
            )}
        </div>
    );
}
