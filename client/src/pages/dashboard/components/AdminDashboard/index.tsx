import "./style.css";
import { useUsersList } from "../../../../hooks/useUsersList";
import { useGetToken } from "../../../../hooks/useGetToken";
import { useCoursesList } from "../../../coursesManagement/hooks/useCoursesList";
export default function AdminDashboard() {
    const token = useGetToken();
    const { users } = useUsersList(token ?? null);
    const { courses } = useCoursesList(token ?? null);
    return (
        <div>
            <h1 className="system-stats">System stats</h1>
            <div className="system-stats">
                <div className="stat-card">
                    <h3>Total Students</h3>
                    <p className="stat-value">{users.filter((user) => user.role === "STUDENT").length}</p>
                </div>

                <div className="stat-card">
                    <h3>Total Teachers</h3>
                    <p className="stat-value">{users.filter((user) => user.role === "TEACHER").length}</p>
                </div>

                <div className="stat-card">
                    <h3>Total Courses</h3>
                    <p className="stat-value">{courses.length}</p>
                </div>
            </div>
        </div>
    );
}
