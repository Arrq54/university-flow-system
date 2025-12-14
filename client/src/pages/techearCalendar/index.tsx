import SideNavigation from "../../components/navigation/SideNavigation";
import PageContent from "../../components/PageContent";
import PageHeader from "../../components/PageHeader";
import Calendar from "./components/Calendar";
import { useUserData } from "../../hooks/useUserInfo";
import { useNavigate } from "react-router-dom";

export default function TeacherCalendar() {
    const { user } = useUserData();
    const navigate = useNavigate();
    if (user?.role && user.role !== "TEACHER") {
        navigate("/signIn");
    }
    return (
        <div>
            <SideNavigation type="TEACHER" activeItem="calendar" />
            <PageContent>
                <PageHeader title="Teacher Calendar" />
                <Calendar />
            </PageContent>
        </div>
    );
}
