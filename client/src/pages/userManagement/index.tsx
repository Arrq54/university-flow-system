import SideNavigation from "../../components/navigation/SideNavigation";
import { useUserData } from "../../hooks/useUserInfo";
import LoadingPopup from "../../components/LoadingPopup";
import PageHeader from "../../components/PageHeader";
import PageContent from "../../components/PageContent";
export default function UserManagement() {
    const { user, loading } = useUserData();

    return (
        <>
            {loading && <LoadingPopup />}

            <div className="page">
                <SideNavigation type={user?.role || "STUDENT"} activeItem="manage-users" />
                <PageContent>
                    <PageHeader />
                </PageContent>
            </div>
        </>
    );
}
