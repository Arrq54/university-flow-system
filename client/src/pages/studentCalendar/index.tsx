import { useUserData } from "../../hooks/useUserInfo";
import { useNavigate } from "react-router-dom";
import SideNavigation from "../../components/navigation/SideNavigation";
import PageContent from "../../components/PageContent";
import PageHeader from "../../components/PageHeader";
import Calendar from "./components/Calendar";

export default function StudentCalendar() {
    const { user } = useUserData();
    const navigate = useNavigate();
    if (user?.role && user.role !== "STUDENT") {
        navigate("/signIn");
    }
    return (
        <div>
            <SideNavigation type="STUDENT" activeItem="calendar" />
            <PageContent>
                <PageHeader title="Student Calendar" />
                <Calendar />
            </PageContent>
        </div>
    );
}
