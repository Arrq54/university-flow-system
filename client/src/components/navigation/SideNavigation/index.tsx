import "./style.css";
import SideNavigationItem from "./components/SideNavigationItem";
import { IconButton } from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../../hooks/useUserInfo";

interface IProps {
    type: "STUDENT" | "TEACHER" | "ADMIN";
    activeItem?: string;
}
export default function SideNavigation({ type, activeItem }: IProps) {
    const navigate = useNavigate();
    const { clearUser } = useUserData();
    const handleLogout = () => {
        clearUser();
        navigate("/signIn");
    };
    const navigationItems = [
        <SideNavigationItem
            icon="/speed-up-line.svg"
            label="Dashboard"
            active={activeItem === "dashboard"}
            url="/dashboard"
        />,
    ];
    switch (type) {
        case "STUDENT":
            navigationItems.push(
                <SideNavigationItem
                    icon="/calendar-2-line.svg"
                    label="Calendar"
                    active={activeItem === "calendar"}
                    url="/student/calendar"
                />
            );
            navigationItems.push(
                <SideNavigationItem
                    icon="/graduation-cap-line.svg"
                    label="Grades"
                    active={activeItem === "grades"}
                    url="/student/grades"
                />
            );
            break;
        case "TEACHER":
            navigationItems.push(
                <SideNavigationItem
                    icon="/calendar-2-line.svg"
                    label="Calendar"
                    active={activeItem === "calendar"}
                    url="/teacher/calendar"
                />
            );
            navigationItems.push(
                <SideNavigationItem
                    icon="/graduation-cap-line.svg"
                    label="Grades"
                    active={activeItem === "grades"}
                    url="/teacher/manage-grades"
                />
            );
            break;
        case "ADMIN":
            navigationItems.push(
                <SideNavigationItem
                    icon="/account-circle-line.svg"
                    label="User Management"
                    active={activeItem === "manage-users"}
                    url="/manage-users"
                />
            );
            navigationItems.push(
                <SideNavigationItem
                    icon="/wrench-line.svg"
                    label="Courses Management"
                    active={activeItem === "manage-courses"}
                    url="/manage-courses"
                />
            );

            break;
        default:
            break;
    }
    navigationItems.push(
        <SideNavigationItem icon="/mail-line.svg" label="Messages" active={activeItem === "messages"} url="/messages" />
    );

    return (
        <div className="side-navigation">
            <div>{navigationItems}</div>
            <div className="logout-container">
                <IconButton onClick={handleLogout} className="sign-out-button">
                    <LogoutIcon />
                </IconButton>
            </div>
        </div>
    );
}
