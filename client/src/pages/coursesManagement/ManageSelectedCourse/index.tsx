import React, { use, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideNavigation from "../../../components/navigation/SideNavigation";
import { useUserData } from "../../../hooks/useUserInfo";
import LoadingPopup from "../../../components/LoadingPopup";
import PageContent from "../../../components/PageContent";
import PageHeader from "../../../components/PageHeader";
import { useGetToken } from "../../../hooks/useGetToken";
import { useCourseData } from "../../../hooks/useCourseData";

export default function ManageSelectedCourse() {
    const { user, loading } = useUserData();
    const { courseCode } = useParams<{ courseCode: string }>();
    const token = useGetToken();
    const navigate = useNavigate();
    const goBack = () => {
        navigate("/manage-courses");
    };
    const { course, loading: loadingCourse, error } = useCourseData(token || "", courseCode || undefined);
    useEffect(() => {
        // You can add any side effects here if needed when course data changes
        console.log("Course data updated:", course);
    }, [course]);
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
                </PageContent>
            </div>
        </>
    );
}
