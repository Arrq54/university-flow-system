import { useEffect, useState } from "react";
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
import AssignStudentsToCourse from "./components/AssignStudentsToCourse";
import AssignTeachersToCourse from "./components/AssignTeachersToCourse";
import AddCourseScheduleItemPopup from "./components/AddCourseScheduleItemPopup";
import CourseSchedule from "./components/CourseSchedule";
import CourseInfoCard from "./components/CourseInfoCard";
import "./style.css";
import type { User } from "../../../hooks/useUsersList";
import type { ScheduleItem } from "./components/CourseSchedule";
import { SERVER_URL } from "../../../config";
import { Button } from "@mui/material";
import ConfirmCourseRemovePopup from "./components/ConfirmCourseRemovePopup";

export default function ManageSelectedCourse() {
    const { user, loading } = useUserData();
    const { courseCode } = useParams<{ courseCode: string }>();
    const token = useGetToken();
    const navigate = useNavigate();
    const goBack = () => {
        navigate("/manage-courses");
    };
    const {
        course,
        loading: loadingCourse,
        refetch: refetchCourseData,
    } = useCourseData(token || "", courseCode || undefined);

    const [students, setStudents] = useState<User[]>([]);
    const [teachers, setTeachers] = useState<User[]>([]);
    const [classes, setClasses] = useState<ScheduleItem[]>([]);
    const [courseLoading, setCourseLoading] = useState(true);

    const [showAssignStudentsPopup, setShowAssignStudentsPopup] = useState(false);
    const [showAssignTeachersPopup, setShowAssignTeachersPopup] = useState(false);
    const [showAddScheduleItemPopup, setShowAddScheduleItemPopup] = useState(false);
    const [showConfirmCourseRemovePopup, setShowConfirmCourseRemovePopup] = useState(false);

    useEffect(() => {
        if (!course) return;
        setCourseLoading(false);
        setStudents(course.assignedStudents || []);
        setTeachers(course.assignedTeachers || []);
        setClasses(course.classes || []);
    }, [course]);

    const handleAssignStudents = async (selectedIds: string[]) => {
        await fetch(`${SERVER_URL}/course/assign-students`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ courseCode, studentIds: selectedIds }),
        });

        refetchCourseData();

        setShowAssignStudentsPopup(false);
    };

    const handleAssignTeachers = async (selectedIds: string[]) => {
        await fetch(`${SERVER_URL}/course/assign-teachers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ courseCode, teacherIds: selectedIds }),
        });

        refetchCourseData();

        setShowAssignTeachersPopup(false);
    };

    const handleAddScheduleItem = async (data: {
        className: string;
        assignedTeacher: string;
        weekday: string;
        startTime: string;
        endTime: string;
    }) => {
        await fetch(`${SERVER_URL}/course/add-schedule-item`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify({ courseCode, ...data }),
        });

        refetchCourseData();

        setShowAddScheduleItemPopup(false);
    };

    const handleRemoveCourse = async () => {
        console.log("Removing course with code:", courseCode);
        await fetch(`${SERVER_URL}/course/delete/${courseCode}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        navigate("/manage-courses");
    };

    return (
        <>
            {(loading || loadingCourse || courseLoading) && <LoadingPopup />}
            {showAssignStudentsPopup && (
                <AssignStudentsToCourse
                    onClose={() => setShowAssignStudentsPopup(false)}
                    onSave={handleAssignStudents}
                    assignedStudents={students}
                />
            )}
            {showAssignTeachersPopup && (
                <AssignTeachersToCourse
                    onClose={() => setShowAssignTeachersPopup(false)}
                    onSave={handleAssignTeachers}
                    assignedTeachers={teachers}
                />
            )}
            {showAddScheduleItemPopup && (
                <AddCourseScheduleItemPopup
                    onClose={() => setShowAddScheduleItemPopup(false)}
                    onSave={handleAddScheduleItem}
                    assignedTeachers={teachers}
                />
            )}
            {showConfirmCourseRemovePopup && (
                <ConfirmCourseRemovePopup
                    onClose={() => setShowConfirmCourseRemovePopup(false)}
                    onConfirm={handleRemoveCourse}
                />
            )}

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
                        button={
                            <Button
                                variant="contained"
                                style={{ minWidth: 200 }}
                                endIcon={
                                    <img
                                        src="/delete-bin-line.svg"
                                        alt=""
                                        style={{ width: 20, height: 20, filter: "var(--white-filter)" }}
                                    />
                                }
                                onClick={() => setShowConfirmCourseRemovePopup(true)}
                            >
                                Remove course
                            </Button>
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
                                <p className="stat-value">{students.length}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Total Teachers</h3>
                                <p className="stat-value">{teachers.length}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Classes per Week</h3>
                                <p className="stat-value">{classes.length}</p>
                            </div>
                        </div>

                        <AssignedStudents
                            assignedStudents={students}
                            onAddStudent={() => setShowAssignStudentsPopup(true)}
                            onRemoveStudent={(id) => console.log("Remove student:", id)}
                        />

                        <AssignedTeachers
                            assignedTeachers={teachers}
                            onAddTeacher={() => setShowAssignTeachersPopup(true)}
                            onRemoveTeacher={(id) => console.log("Remove teacher:", id)}
                        />

                        <CourseSchedule
                            schedule={classes}
                            teachers={teachers}
                            onAddSchedule={() => setShowAddScheduleItemPopup(true)}
                            onEditSchedule={(id) => console.log("Edit schedule:", id)}
                            onDeleteSchedule={(id) => console.log("Delete schedule:", id)}
                        />
                    </div>
                </PageContent>
            </div>
        </>
    );
}
