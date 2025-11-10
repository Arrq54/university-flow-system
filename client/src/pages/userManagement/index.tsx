import SideNavigation from "../../components/navigation/SideNavigation";
import { useUserData } from "../../hooks/useUserInfo";
import LoadingPopup from "../../components/LoadingPopup";
import PageHeader from "../../components/PageHeader";
import PageContent from "../../components/PageContent";
import Panel from "./components/Panel";
import "./style.css";
import AddUserPopup from "./components/Panel/components/ManageUserPopup";
import { useState } from "react";
import { useUsersList, type User } from "../../hooks/useUsersList";
import { useGetToken } from "../../hooks/useGetToken";
import ManageUserPopup from "./components/Panel/components/ManageUserPopup";
export default function UserManagement() {
    const token = useGetToken();
    const { users, loading: loadingUsers, error, refetch } = useUsersList(token || null);
    const { user, loading } = useUserData();
    const [addUserType, setAddUserType] = useState("");
    const [editUser, setEditUser] = useState<undefined | User>();
    const reloadPeople = () => {
        refetch();
    };
    return (
        <>
            {(loading || loadingUsers) && <LoadingPopup />}
            {addUserType && (
                <ManageUserPopup
                    type={addUserType}
                    popupType="add"
                    onClose={() => setAddUserType("")}
                    reloadPeople={reloadPeople}
                    editedUser={editUser}
                />
            )}
            {editUser && (
                <ManageUserPopup
                    type={editUser.role === "TEACHER" ? "teachers" : "students"}
                    popupType="edit"
                    onClose={() => setEditUser(undefined)}
                    reloadPeople={reloadPeople}
                    editedUser={editUser}
                />
            )}
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
                            editOnClick={(user) => setEditUser(user)}
                            reloadPeople={reloadPeople}
                        />
                        <Panel
                            type="students"
                            icon="graduation-cap-line.svg"
                            people={[...users.filter((user) => user.role === "STUDENT")]}
                            addOnClick={() => setAddUserType("students")}
                            editOnClick={(user) => setEditUser(user)}
                            reloadPeople={reloadPeople}
                        />
                    </div>
                </PageContent>
            </div>
        </>
    );
}
