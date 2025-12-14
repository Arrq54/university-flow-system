import SideNavigation from "../../components/navigation/SideNavigation";
import PageContent from "../../components/PageContent";
import PageHeader from "../../components/PageHeader";
import { useTeacherData } from "../../hooks/useTeacherData";
import { useUserData } from "../../hooks/useUserInfo";
import { useGetToken } from "../../hooks/useGetToken";
import { SERVER_URL } from "../../config";

import { useNavigate } from "react-router-dom";
import CoursesList from "./components/CoursesList";

export default function TeacherGradeManagement() {
    const { user } = useUserData();
    const { courses, refetch } = useTeacherData(user?._id || "");
    const token = useGetToken();
    const navigate = useNavigate();
    if (user?.role && user.role !== "TEACHER") {
        navigate("/signIn");
    }

    const handleFinalGradeChange = async (courseId: string, classId: string, studentId: string, grade: number) => {
        try {
            const response = await fetch(`${SERVER_URL}/course/${courseId}/class/${classId}/final-grade`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ studentId, grade }),
            });

            if (!response.ok) {
                throw new Error("Failed to update final grade");
            }

            refetch();
        } catch (error) {
            console.error("Error updating final grade:", error);
        }
    };

    return (
        <div>
            <SideNavigation type="TEACHER" activeItem="grades" />
            <PageContent>
                <PageHeader title="Grade Management" />
                {courses && (
                    <CoursesList courses={courses} onFinalGradeChange={handleFinalGradeChange} onRefresh={refetch} />
                )}
            </PageContent>
        </div>
    );
}
