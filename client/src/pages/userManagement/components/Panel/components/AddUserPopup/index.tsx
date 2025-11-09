import { useState } from "react";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, IconButton } from "@mui/material";
import { Save as SaveIcon, Cancel as CancelIcon } from "@mui/icons-material";
import ContentDivider from "../../../../../../components/ContentDivider";
import ContentHeader from "../../../../../../components/ContentHeader";
import "./style.css";
import { useAddUser } from "./hooks/useAddUser";

interface IProps {
    type: string;
    onClose: () => void;
}

export default function AddUserPopup({ type, onClose }: IProps) {
    const { add, loading, error, success } = useAddUser();

    const resetAndClose = () => {
        setName("");
        setTitle("");
        setSurname("");
        onClose();
    };

    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [processing, setProcessing] = useState(false);

    // Academic titles and degrees
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

        await add({ name, surname, email, password, title, role: type === "teachers" ? "TEACHER" : "STUDENT" });
        setProcessing(false);
        resetAndClose();
    };

    const handleCancel = () => {
        setName("");
        setTitle("");
        setSurname("");

        onClose();
    };

    return (
        <div className="popup-background">
            <div className="popup-container">
                <div className="popup-header">
                    <ContentHeader title={`Add New User (${type})`} size="large" />
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

                        <div className="input-field">
                            <TextField
                                label="Surname"
                                type="text"
                                variant="outlined"
                                value={surname}
                                fullWidth
                                required
                                onChange={(e) => setSurname(e.target.value)}
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
                        disabled={processing || !name || !title || !surname || !email || !password}
                        className="save-button"
                    >
                        {processing ? "Saving..." : "Save"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
