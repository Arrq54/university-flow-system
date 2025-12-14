import SideNavigation from "../../components/navigation/SideNavigation";
import PageContent from "../../components/PageContent";
import PageHeader from "../../components/PageHeader";
import { useStudentData } from "../../hooks/useStudentData";
import { useUserData } from "../../hooks/useUserInfo";
import { useGetToken } from "../../hooks/useGetToken";
import CoursesList from "./components/CoursesList";
import { useNavigate } from "react-router-dom";

export default function StudentGradeManagement() {
    const { user } = useUserData();
    const token = useGetToken();
    const { courses } = useStudentData(token || null, user?._id || null);
    const navigate = useNavigate();

    if (user?.role && user.role !== "STUDENT") {
        navigate("/signIn");
    }

    return (
        <div>
            <SideNavigation type="STUDENT" activeItem="grades" />
            <PageContent>
                <PageHeader title="My Grades" />
                {courses && <CoursesList courses={courses} />}
            </PageContent>
        </div>
    );
}
