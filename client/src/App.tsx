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
                <Route
                    path="/manage-courses"
                    element={
                        <ProtectedRoute>
                            <CoursesManagement />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/manage-courses/:courseCode"
                    element={
                        <ProtectedRoute>
                            <ManageSelectedCourse />
                        </ProtectedRoute>
                    }
                />

                {/* TEACHER */}
                <Route
                    path="/teacher/calendar"
                    element={
                        <ProtectedRoute>
                            <TeacherCalendar />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/teacher/manage-grades"
                    element={
                        <ProtectedRoute>
                            <TeacherGradeManagement />
                        </ProtectedRoute>
                    }
                />

                {/* student */}
                <Route
                    path="/student/calendar"
                    element={
                        <ProtectedRoute>
                            <StudentCalendar />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/student/grades"
                    element={
                        <ProtectedRoute>
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
