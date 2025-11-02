import { Navigate } from "react-router-dom";
import React from "react";
import Cookies from "js-cookie";
interface ProtectedRouteProps {
    children: React.ReactElement;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const token = Cookies.get("token");

    if (!token) {
        return <Navigate to="/signIn" replace />;
    }

    return children;
};

export default ProtectedRoute;
