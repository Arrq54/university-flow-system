import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/signIn";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardPage from "./pages/dashboard";
import "./index.css";
import HomePage from "./pages/homepage";
import UserManagement from "./pages/userManagement";
import CoursesManagement from "./pages/coursesManagement";
import ManageSelectedCourse from "./pages/coursesManagement/ManageSelectedCourse";
import TeacherCalendar from "./pages/techearCalendar";
import TeacherGradeManagement from "./pages/TeacherGradeManagement";
import Messages from "./pages/messages";
import StudentCalendar from "./pages/studentCalendar";
import StudentGradeManagement from "./pages/StudentGradeManagement";

function App() {
    return (
        <div className="app-container">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signIn" element={<SignIn />} />

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
                        <ProtectedRoute allowedRoles={["ADMIN"]}>
                            <UserManagement />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/manage-courses"
                    element={
                        <ProtectedRoute allowedRoles={["ADMIN"]}>
                            <CoursesManagement />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/manage-courses/:courseCode"
                    element={
                        <ProtectedRoute allowedRoles={["ADMIN"]}>
                            <ManageSelectedCourse />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/teacher/calendar"
                    element={
                        <ProtectedRoute allowedRoles={["TEACHER"]}>
                            <TeacherCalendar />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/teacher/manage-grades"
                    element={
                        <ProtectedRoute allowedRoles={["TEACHER"]}>
                            <TeacherGradeManagement />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/calendar"
                    element={
                        <ProtectedRoute allowedRoles={["STUDENT"]}>
                            <StudentCalendar />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/student/grades"
                    element={
                        <ProtectedRoute allowedRoles={["STUDENT"]}>
                            <StudentGradeManagement />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/messages"
                    element={
                        <ProtectedRoute>
                            <Messages />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
