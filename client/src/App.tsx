import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/signIn";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardPage from "./pages/dashboard";
import "./index.css";
import HomePage from "./pages/homepage";
import UserManagement from "./pages/userManagement";
function App() {
    return (
        <div className="app-container">
            {/* <Navbar /> */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                {/* Public routes */}
                <Route path="/signIn" element={<SignIn />} />

                {/* {/* Protected routes */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/manage-users"
                    element={
                        <ProtectedRoute>
                            <UserManagement />
                        </ProtectedRoute>
                    }
                />

                {/* Redirects and fallback */}
                {/* <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="*" element={<NotFoundPage />} /> */}
            </Routes>
        </div>
    );
}

export default App;
