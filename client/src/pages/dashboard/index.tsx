import React from "react";
import SideNavigation from "../../components/navigation/SideNavigation";
import { useUserData } from "../../hooks/useUserInfo";
import LoadingPopup from "../../components/LoadingPopup";
import PageContent from "../../components/PageContent";
import PageHeader from "../../components/PageHeader";
import AdminDashboard from "./components/AdminDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import { useGetToken } from "../../hooks/useGetToken";

export default function Dashboard() {
    const { user, loading } = useUserData();
    const token = useGetToken();
    return (
        <>
            {loading && <LoadingPopup />}

            <div className="page">
                <SideNavigation type={user?.role || "STUDENT"} activeItem="dashboard" />
                <PageContent>
                    <PageHeader title="Welcome to your Dashboard!" />
                    {user?.role === "ADMIN" && <AdminDashboard />}
                    {user?.role === "TEACHER" && <TeacherDashboard />}
                </PageContent>
            </div>
        </>
    );
}
