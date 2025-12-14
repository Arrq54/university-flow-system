import { useState } from "react";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, IconButton } from "@mui/material";
import { Save as SaveIcon, Cancel as CancelIcon } from "@mui/icons-material";
import ContentDivider from "../../../../../../components/ContentDivider";
import ContentHeader from "../../../../../../components/ContentHeader";
import "./style.css";
import { useManageUser } from "../../hooks/useManageUser";
import type { User } from "../../../../../../hooks/useUsersList";

interface IProps {
    type: string;
    popupType: string;
    onClose: () => void;
    reloadPeople: () => void;
    editedUser?: User;
}

export default function ManageUserPopup({ type, popupType, onClose, reloadPeople, editedUser }: IProps) {
    const { add, edit } = useManageUser();

    const resetAndClose = () => {
        setName("");
        setTitle("");
        onClose();
    };

    const [name, setName] = useState(editedUser ? editedUser.name : "");
    const [title, setTitle] = useState(editedUser ? editedUser.title : "");
    const [email, setEmail] = useState(editedUser ? editedUser.email : "");
    const [password, setPassword] = useState("");
    const [processing, setProcessing] = useState(false);

    const academicTitles = [
        "Mr.",
        "Ms.",
        "Dr.",
        "Prof.",
        "Prof. Dr.",
        "B.Sc.",
        "M.Sc.",
        "M.A.",
        "M.E.",
        "PhD",
        "Prof. PhD",
        "Assoc. Prof.",
        "Asst. Prof.",
        "Lecturer",
        "Senior Lecturer",
    ];

    const handleSave = async () => {
        setProcessing(true);
        if (popupType === "add") {
            await add({ name, email, password, title, role: type === "teachers" ? "TEACHER" : "STUDENT" });
        } else {
            await edit(editedUser!._id, {
                name,
                email,
                title,
                role: type === "teachers" ? "TEACHER" : "STUDENT",
                password,
            });
        }

        setProcessing(false);
        resetAndClose();
        reloadPeople();
    };

    const handleCancel = () => {
        setName("");
        setTitle("");

        onClose();
    };

    return (
        <div className="popup-background">
            <div className="popup-container">
                <div className="popup-header">
                    <ContentHeader
                        title={popupType == "add" ? `Add New User (${type})` : `Edit User (${type})`}
                        size="large"
                    />
                </div>

                <ContentDivider type="line" orientation="horizontal" />

                <div className="popup-content">
                    <div className="inputs-container">
                        <div className="input-field">
                            <TextField
                                label="Name"
                                type="text"
                                variant="outlined"
                                value={name}
                                fullWidth
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        {type === "teachers" && (
                            <div className="input-field">
                                <FormControl fullWidth required>
                                    <InputLabel id="title-label">Title</InputLabel>
                                    <Select
                                        labelId="title-label"
                                        value={title}
                                        label="Title"
                                        onChange={(e) => setTitle(e.target.value)}
                                    >
                                        {academicTitles.map((titleOption) => (
                                            <MenuItem key={titleOption} value={titleOption}>
                                                {titleOption}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        )}
                        <div className="input-field">
                            <TextField
                                label="Email"
                                type="email"
                                variant="outlined"
                                value={email}
                                fullWidth
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                value={password}
                                fullWidth
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <IconButton
                                color="primary"
                                aria-label=""
                                onClick={() =>
                                    setPassword(
                                        Array.from({ length: 12 }, () =>
                                            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}<>?".charAt(
                                                Math.floor(Math.random() * 88)
                                            )
                                        ).join("")
                                    )
                                }
                            >
                                <img src="dice-line.svg" alt="Show Password" style={{ width: 20, height: 20 }} />
                            </IconButton>
                        </div>
                    </div>
                </div>

                <ContentDivider type="line" orientation="horizontal" />

                <div className="popup-actions">
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<CancelIcon />}
                        onClick={handleCancel}
                        className="cancel-button"
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                        disabled={processing || !name || !email || !password}
                        className="save-button"
                    >
                        {processing ? "Saving..." : "Save"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
