import { useState } from "react";
import {
    Button,
    Radio,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    TextField,
    CircularProgress,
} from "@mui/material";
import { Send as SendIcon, Cancel as CancelIcon } from "@mui/icons-material";
import ContentDivider from "../../../../components/ContentDivider";
import ContentHeader from "../../../../components/ContentHeader";
import { useUsersList } from "../../../../hooks/useUsersList";
import { useGetToken } from "../../../../hooks/useGetToken";
import { SERVER_URL } from "../../../../config";
import "./style.css";

interface IProps {
    onClose: () => void;
    onSuccess?: () => void;
}

export default function NewMessagePopup({ onClose, onSuccess }: IProps) {
    const token = useGetToken();
    const { users, loading: loadingUsers } = useUsersList(token || null);
    const [selectedUserId, setSelectedUserId] = useState<string>("");
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);

    const handleToggle = (userId: string) => () => {
        setSelectedUserId(userId);
    };

    const handleSend = async () => {
        if (!token || !selectedUserId) return;
        setSending(true);
        try {
            const res = await fetch(`${SERVER_URL}/messages/send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    receiverIds: [selectedUserId],
                    content: message,
                }),
            });

            if (res.ok) {
                onSuccess?.();
                onClose();
            } else {
                console.error("Failed to send message");
            }
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="popup-background">
            <div className="popup-container">
                <div className="popup-header">
                    <ContentHeader title="New Message" size="large" />
                </div>

                <ContentDivider type="line" orientation="horizontal" />

                <div className="popup-content">
                    <div className="inputs-container">
                        <div className="input-field" style={{ maxHeight: "200px", overflowY: "auto" }}>
                            {loadingUsers ? (
                                <CircularProgress />
                            ) : (
                                <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
                                    {users.map((user) => {
                                        const labelId = `radio-list-label-${user._id}`;
                                        return (
                                            <ListItem key={user._id} disablePadding>
                                                <ListItemButton role={undefined} onClick={handleToggle(user._id)} dense>
                                                    <ListItemIcon>
                                                        <Radio
                                                            edge="start"
                                                            checked={selectedUserId === user._id}
                                                            tabIndex={-1}
                                                            disableRipple
                                                            inputProps={{ "aria-labelledby": labelId }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        id={labelId}
                                                        primary={`${user.name} (${user.role})`}
                                                        secondary={user.email}
                                                    />
                                                </ListItemButton>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            )}
                        </div>
                        <div className="input-field">
                            <TextField
                                label="Message"
                                multiline
                                rows={4}
                                variant="outlined"
                                fullWidth
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                    </div>

                    <div
                        className="popup-actions"
                        style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}
                    >
                        <Button variant="outlined" color="error" startIcon={<CancelIcon />} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SendIcon />}
                            onClick={handleSend}
                            disabled={sending || !selectedUserId || !message}
                        >
                            {sending ? "Sending..." : "Send"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
