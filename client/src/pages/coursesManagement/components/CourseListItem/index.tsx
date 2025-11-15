import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

interface IProps {
    icon: string;
    courseName: string;
    courseCode: string;
}
export default function CourseListItem({ icon, courseName, courseCode }: IProps) {
    const navigate = useNavigate();
    return (
        <div
            className="course-list-item"
            onClick={() => {
                navigate(`/manage-courses/${courseCode}`);
            }}
        >
            <img src={`/courses/${icon}`} alt="" className="course-icon" />
            {courseName} ({courseCode})
        </div>
    );
}
