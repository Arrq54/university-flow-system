import React from "react";
import SideNavigation from "../../components/navigation/SideNavigation";
import PageContent from "../../components/PageContent";
import PageHeader from "../../components/PageHeader";
import Calendar from "./components/Calendar";

export default function TeacherCalendar() {
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
