import { Button } from "@mui/material";

import "./style.css";
interface IPProps {
    addOnClick: () => void;
}
export default function Controls({ addOnClick }: IPProps) {
    return (
        <div className="controls">
            <Button
                variant="contained"
                style={{ minWidth: 100 }}
                endIcon={
                    <img src="add-line.svg" alt="" style={{ width: 20, height: 20, filter: "var(--white-filter)" }} />
                }
                onClick={addOnClick}
            >
                Add
            </Button>
        </div>
    );
}
