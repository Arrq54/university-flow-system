import "./style.css";

interface IProps {
    courseName: string;
    courseCode: string;
    icon: string;
}

export default function CourseInfoCard({ courseName, courseCode, icon }: IProps) {
    return (
        <div className="course-info-card">
            <div className="course-icon-wrapper">
                <img src={`/courses/${icon}`} alt={courseName} className="course-info-icon" />
            </div>
            <div className="course-info-details">
                <h1 className="course-info-name">{courseName}</h1>
                <p className="course-info-code">Course Code: {courseCode}</p>
            </div>
        </div>
    );
}
