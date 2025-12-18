import SideNavigation from "../../components/navigation/SideNavigation";
import PageContent from "../../components/PageContent";
import PageHeader from "../../components/PageHeader";
import Calendar from "./components/Calendar";

export default function StudentCalendar() {
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
