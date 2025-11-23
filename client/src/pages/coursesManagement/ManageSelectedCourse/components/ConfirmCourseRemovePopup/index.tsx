import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { Cancel as CancelIcon, Delete as DeleteIcon } from "@mui/icons-material";
import ContentDivider from "../../../../../components/ContentDivider";
import ContentHeader from "../../../../../components/ContentHeader";
import "./style.css";

interface IProps {
    onClose: () => void;
    onConfirm: () => Promise<void>;
}

export default function ConfirmCourseRemovePopup({ onClose, onConfirm }: IProps) {
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        await onConfirm();
        setSaving(false);
    };

    return (
        <div className="popup-background" onClick={onClose}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">
                    <ContentHeader title="Are you sure you want to remove this course?" size="large" />
                </div>

                <ContentDivider type="line" orientation="horizontal" />

                <div className="popup-actions">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={onClose}
                        startIcon={<CancelIcon />}
                        disabled={saving}
                    >
                        No
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <DeleteIcon />}
                        disabled={saving}
                    >
                        Yes
                    </Button>
                </div>
            </div>
        </div>
    );
}
