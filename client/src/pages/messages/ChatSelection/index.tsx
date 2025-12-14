import { useMemo, useEffect } from "react";
import "./style.css";
import { useUserConversations } from "../hooks/useUserConversations";
import { useGetToken } from "../../../hooks/useGetToken";
import { useUserData } from "../../../hooks/useUserInfo";
import { useUsersList } from "../../../hooks/useUsersList";

export default function ChatSelection({
    setSelectedChatId,
    refreshTrigger,
}: {
    setSelectedChatId?: (chatId: string) => void;
    refreshTrigger?: number;
}) {
    const { user } = useUserData();
    const { conversations, refetch } = useUserConversations(useGetToken() ?? null, user?._id || null);
    const { users } = useUsersList(useGetToken() || null);

    useEffect(() => {
        if (refreshTrigger !== undefined && refreshTrigger > 0) {
            refetch();
        }
    }, [refreshTrigger]);

    const userConversations = useMemo(() => {
        if (!conversations || !users || !user) return [];
        return conversations.map((conv) => {
            const memberDetails = conv.memberIds;
            const loggedInUserId = user._id;
            const otherMemberId = memberDetails.find((id) => id !== loggedInUserId) ?? loggedInUserId;
            const otherMember = users.find((u) => u._id.toString() === otherMemberId.toString());
            return {
                members: otherMember,
                convId: conv._id.toString(),
            };
        });
    }, [conversations, users, user]);
    return (
        <div className="chat-selection">
            {userConversations.map((conv, index) => (
                <div key={index} className="chat" onClick={() => setSelectedChatId?.(conv.convId)}>
                    {conv.members?.name}
                </div>
            ))}
            {userConversations.length === 0 && <p className="empty-state-chats">No conversations available.</p>}
        </div>
    );
}
