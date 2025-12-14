import { useState } from "react";
import "./style.css";
import ContentHeader from "../../components/ContentHeader";
import SignInInput from "./components/SignInInput";
import { Button } from "@mui/material";
import { signIn } from "./utils/auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSignIn = async () => {
        // Handle sign-in logic here
        setProcessing(true);
        try {
            const data = await signIn({ email, password });
            Cookies.set("token", data.token, {
                expires: 1, // 1 day
                secure: false,
                sameSite: "lax",
            });
            navigate("/dashboard");
        } catch (e) {
            setError("Wrong credentials! Please try again.");
            setProcessing(false);
        }

        // setProcessing(true);
    };
    return (
        <div className="sign-in-page">
            <div className="sign-in-form">
                <ContentHeader size="xLarge" title="Welcome to UFS" align="center" />
                <div className="description text-center">
                    To sign in, please enter credentials provided by your administrator.
                </div>
                <div className="inputs-container">
                    <SignInInput label="E-mail" type="email" value={email} setValue={setEmail} />
                    <SignInInput label="Password" type="password" value={password} setValue={setPassword} />
                </div>
                <div className="form-controls">
                    <Button variant="contained" color="primary" onClick={handleSignIn} loading={processing}>
                        Sign In
                    </Button>
                </div>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
}
