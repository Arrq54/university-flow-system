import { useState } from "react";
import SideNavigation from "../../components/navigation/SideNavigation";
import { useUserData } from "../../hooks/useUserInfo";
import PageContent from "../../components/PageContent";
import PageHeader from "../../components/PageHeader";
import ChatSelection from "./ChatSelection";
import { Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import NewMessagePopup from "./components/NewMessagePopup";
import Chat from "./Chat";

export default function Messages() {
    const { user } = useUserData();
    const [showNewMessagePopup, setShowNewMessagePopup] = useState(false);
    const [chatRefreshTrigger, setChatRefreshTrigger] = useState(0);

    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

    return (
        <>
            <SideNavigation type={user?.role || "STUDENT"} activeItem="messages" />
            <PageContent>
                <PageHeader
                    title="Messages"
                    goBack={selectedChatId ? () => setSelectedChatId(null) : undefined}
                    customStyle={selectedChatId ? { position: "fixed", width: "100%" } : undefined}
                    button={
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => setShowNewMessagePopup(true)}
                        >
                            New
                        </Button>
                    }
                />
                {!selectedChatId && (
                    <ChatSelection setSelectedChatId={setSelectedChatId} refreshTrigger={chatRefreshTrigger} />
                )}
                {selectedChatId && <Chat chatId={selectedChatId} />}
            </PageContent>
            {showNewMessagePopup && (
                <NewMessagePopup
                    onClose={() => setShowNewMessagePopup(false)}
                    onSuccess={() => setChatRefreshTrigger((prev) => prev + 1)}
                />
            )}
        </>
    );
}
