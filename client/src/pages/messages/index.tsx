import React from "react";
import SideNavigation from "../../components/navigation/SideNavigation";
import { useUserData } from "../../hooks/useUserInfo";
import PageContent from "../../components/PageContent";
import PageHeader from "../../components/PageHeader";
import ChatSelection from "../homepage/components/ChatSelection";

export default function Messages() {
    const { user } = useUserData();
    return (
        <div>
            <SideNavigation type={user?.role || "STUDENT"} activeItem="messages" />
            <PageContent>
                <PageHeader title="Messages" />
                <ChatSelection />
            </PageContent>
        </div>
    );
}
