import { TextField } from "@mui/material";
import "./style.css";
interface IProps {
    label: string;
    type: "text" | "password" | "email";
    value?: string;
    setValue?: (value: string) => void;
}
export default function SignInInput({ label, value, setValue, type }: IProps) {
    return (
        <div className="sign-in-input">
            <TextField
                label={label}
                type={type}
                variant="outlined"
                value={value}
                fullWidth={true}
                required={true}
                onChange={(e) => setValue?.(e.target.value)}
            />
        </div>
    );
}
