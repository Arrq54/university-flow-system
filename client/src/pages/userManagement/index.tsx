import SideNavigation from "../../components/navigation/SideNavigation";
import { useUserData } from "../../hooks/useUserInfo";
import LoadingPopup from "../../components/LoadingPopup";
import PageHeader from "../../components/PageHeader";
import PageContent from "../../components/PageContent";
import Panel from "./components/Panel";
import "./style.css";
import AddUserPopup from "./components/Panel/components/AddUserPopup";
import { useState } from "react";
import { useUsersList } from "../../hooks/useUsersList";
import { useGetToken } from "../../hooks/useGetToken";
export default function UserManagement() {
    const token = useGetToken();
    const { users, loading: loadingUsers, error } = useUsersList(token || null);
    const { user, loading } = useUserData();
    const [addUserType, setAddUserType] = useState("");
    return (
        <>
            {(loading || loadingUsers) && <LoadingPopup />}
            {addUserType && <AddUserPopup type={addUserType} onClose={() => setAddUserType("")} />}
            <div className="page">
                <SideNavigation type={user?.role || "STUDENT"} activeItem="manage-users" />
                <PageContent>
                    <PageHeader title="User Management - create accounts for students or teachers" />
                    <div className="content">
                        <Panel
                            type="teachers"
                            icon="briefcase-4-line.svg"
                            people={[...users.filter((user) => user.role === "TEACHER")]}
                            addOnClick={() => setAddUserType("teachers")}
                        />
                        <Panel
                            type="students"
                            icon="graduation-cap-line.svg"
                            people={[...users.filter((user) => user.role === "STUDENT")]}
                            addOnClick={() => setAddUserType("students")}
                        />
                    </div>
                </PageContent>
            </div>
        </>
    );
}
