import { Navigate } from "react-router-dom";
import React from "react";
import Cookies from "js-cookie";
import { useUserData } from "../hooks/useUserInfo";
import LoadingPopup from "../components/LoadingPopup";

type Role = "STUDENT" | "TEACHER" | "ADMIN";

interface ProtectedRouteProps {
    children: React.ReactElement;
    allowedRoles?: Role[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const token = Cookies.get("token");
    const { user, loading } = useUserData();

    if (!token) {
        return <Navigate to="/signIn" replace />;
    }

    if (allowedRoles) {
        if (loading) {
            return <LoadingPopup />;
        }

        if (!user || !allowedRoles.includes(user.role)) {
            Cookies.remove("token");
            return <Navigate to="/signIn" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
