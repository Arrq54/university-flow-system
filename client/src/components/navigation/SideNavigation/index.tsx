import "./style.css";
import SideNavigationItem from "./components/SideNavigationItem";
import { IconButton, Drawer } from "@mui/material";
import { Logout as LogoutIcon, Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../../hooks/useUserInfo";
import { useState, useEffect } from "react";

interface IProps {
    type: "STUDENT" | "TEACHER" | "ADMIN";
    activeItem?: string;
}
export default function SideNavigation({ type, activeItem }: IProps) {
    const navigate = useNavigate();
    const { clearUser } = useUserData();
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleLogout = () => {
        clearUser();
        navigate("/signIn");
        setMenuOpen(false);
    };

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
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

    const navContent = (
        <>
            <div>{navigationItems}</div>
            <div className="logout-container">
                <IconButton onClick={handleLogout} className="sign-out-button">
                    <LogoutIcon />
                </IconButton>
            </div>
        </>
    );

    if (isMobile) {
        return (
            <>
                <div className="mobile-header">
                    <IconButton onClick={handleMenuToggle} className="hamburger-button">
                        <MenuIcon />
                    </IconButton>
                </div>
                <Drawer
                    anchor="left"
                    open={menuOpen}
                    onClose={() => setMenuOpen(false)}
                    className="mobile-drawer"
                    PaperProps={{
                        sx: {
                            width: "250px",
                            background: "linear-gradient(180deg, #2e3440 0%, rgba(46, 52, 64, 0.95) 100%)",
                            color: "white",
                        },
                    }}
                >
                    <div className="drawer-close-button">
                        <IconButton onClick={() => setMenuOpen(false)}>
                            <CloseIcon sx={{ color: "white" }} />
                        </IconButton>
                    </div>
                    <div className="drawer-content">{navContent}</div>
                </Drawer>
            </>
        );
    }

    return <div className="side-navigation">{navContent}</div>;
}
