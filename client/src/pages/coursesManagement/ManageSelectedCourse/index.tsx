import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideNavigation from "../../../components/navigation/SideNavigation";
import { useUserData } from "../../../hooks/useUserInfo";
import LoadingPopup from "../../../components/LoadingPopup";
import PageContent from "../../../components/PageContent";
import PageHeader from "../../../components/PageHeader";
import { useGetToken } from "../../../hooks/useGetToken";
import { useCourseData } from "../../../hooks/useCourseData";
import AssignedStudents from "./components/AssignedStudents";
import AssignedTeachers from "./components/AssignedTeachers";
import CourseSchedule from "./components/CourseSchedule";
import CourseInfoCard from "./components/CourseInfoCard";
import "./style.css";
import type { User } from "../../../hooks/useUsersList";
import type { ScheduleItem } from "./components/CourseSchedule";

export default function ManageSelectedCourse() {
    const { user, loading } = useUserData();
    const { courseCode } = useParams<{ courseCode: string }>();
    const token = useGetToken();
    const navigate = useNavigate();
    const goBack = () => {
        navigate("/manage-courses");
    };
    const { course, loading: loadingCourse } = useCourseData(token || "", courseCode || undefined);

    useEffect(() => {
        console.log("Course data updated:", course);
    }, [course]);

    const sampleStudents: User[] = [
        // {
        //     _id: "1",
        //     name: "John Doe",
        //     surname: "Doe",
        //     email: "john.doe@university.edu",
        //     role: "STUDENT",
        //     title: "",
        // },
        // {
        //     _id: "2",
        //     name: "Jane Smith",
        //     surname: "Smith",
        //     email: "jane.smith@university.edu",
        //     role: "STUDENT",
        //     title: "",
        // },
        // {
        //     _id: "3",
        //     name: "Alice Johnson",
        //     surname: "Johnson",
        //     email: "alice.johnson@university.edu",
        //     role: "STUDENT",
        //     title: "",
        // },
        // {
        //     _id: "4",
        //     name: "Bob Williams",
        //     surname: "Williams",
        //     email: "bob.williams@university.edu",
        //     role: "STUDENT",
        //     title: "",
        // },
        // {
        //     _id: "1",
        //     name: "John Doe",
        //     surname: "Doe",
        //     email: "john.doe@university.edu",
        //     role: "STUDENT",
        //     title: "",
        // },
        // {
        //     _id: "2",
        //     name: "Jane Smith",
        //     surname: "Smith",
        //     email: "jane.smith@university.edu",
        //     role: "STUDENT",
        //     title: "",
        // },
        {
            _id: "3",
            name: "Alice Johnson",
            surname: "Johnson",
            email: "alice.johnson@university.edu",
            role: "STUDENT",
            title: "",
        },
        {
            _id: "4",
            name: "Bob Williams",
            surname: "Williams",
            email: "bob.williams@university.edu",
            role: "STUDENT",
            title: "",
        },
    ];

    const sampleTeachers: User[] = [
        {
            _id: "t1",
            name: "Robert Anderson",
            surname: "Anderson",
            email: "r.anderson@university.edu",
            role: "TEACHER",
            title: "Prof.",
        },
        {
            _id: "t2",
            name: "Sarah Miller",
            surname: "Miller",
            email: "s.miller@university.edu",
            role: "TEACHER",
            title: "Dr.",
        },
    ];

    const sampleSchedule: ScheduleItem[] = [
        {
            _id: "s1",
            weekday: "Monday",
            startTime: "10:00",
            endTime: "11:30",
        },
        // {
        //     _id: "s2",
        //     weekday: "Wednesday",
        //     startTime: "14:00",
        //     endTime: "15:30",
        // },
        // {
        //     _id: "s3",
        //     weekday: "Friday",
        //     startTime: "09:00",
        //     endTime: "10:30",
        // },
    ];

    return (
        <>
            {(loading || loadingCourse) && <LoadingPopup />}

            <div className="page">
                <SideNavigation type={user?.role || "STUDENT"} activeItem="manage-courses" />
                <PageContent>
                    <PageHeader
                        goBack={goBack}
                        title={
                            course
                                ? `Manage Course - ${course.courseName} (${course.courseCode})`
                                : `Manage Course - ${courseCode}`
                        }
                    />
                    <div className="manage-course-container">
                        {course && (
                            <CourseInfoCard
                                courseName={course.courseName}
                                courseCode={course.courseCode}
                                icon={course.icon}
                            />
                        )}

                        <div className="course-stats">
                            <div className="stat-card">
                                <h3>Total Students</h3>
                                <p className="stat-value">{sampleStudents.length}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Total Teachers</h3>
                                <p className="stat-value">{sampleTeachers.length}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Classes per Week</h3>
                                <p className="stat-value">{sampleSchedule.length}</p>
                            </div>
                        </div>

                        <AssignedStudents
                            assignedStudents={sampleStudents}
                            onAddStudent={() => console.log("Add student clicked")}
                            onRemoveStudent={(id) => console.log("Remove student:", id)}
                        />

                        <AssignedTeachers
                            assignedTeachers={sampleTeachers}
                            onAddTeacher={() => console.log("Add teacher clicked")}
                            onRemoveTeacher={(id) => console.log("Remove teacher:", id)}
                        />

                        <CourseSchedule
                            schedule={sampleSchedule}
                            onAddSchedule={() => console.log("Add schedule clicked")}
                            onEditSchedule={(id) => console.log("Edit schedule:", id)}
                            onDeleteSchedule={(id) => console.log("Delete schedule:", id)}
                        />
                    </div>
                </PageContent>
            </div>
        </>
    );
}
