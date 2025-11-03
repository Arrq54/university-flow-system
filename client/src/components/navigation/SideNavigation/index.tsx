import "./style.css";
import SideNavigationItem from "./components/SideNavigationItem";
export default function SideNavigation() {
    return (
        <div className="side-navigation">
            <SideNavigationItem icon="speed-up-line.svg" label="Dashboard" active />
            <SideNavigationItem icon="booklet-line.svg" label="Courses" />
            <SideNavigationItem icon="calendar-2-line.svg" label="Calendar" />
            <SideNavigationItem icon="graduation-cap-line.svg" label="Grades" />
            <SideNavigationItem icon="mail-line.svg" label="Notifications" />
            <SideNavigationItem icon="settings-4-line.svg" label="Settings" />
        </div>
    );
}
