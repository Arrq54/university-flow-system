import { useState, useEffect } from "react";
import SideNavigation from "../../components/navigation/SideNavigation";
import { useUserData } from "../../hooks/useUserInfo";
import LoadingPopup from "../../components/LoadingPopup";
import PageContent from "../../components/PageContent";
import PageHeader from "../../components/PageHeader";
import AddCoursePopup from "./components/AddCoursePopup";
import "./style.css";
import { Button } from "@mui/material";
import { useCoursesList } from "./hooks/useCoursesList";
import { useGetToken } from "../../hooks/useGetToken";
import CourseListItem from "./components/CourseListItem";
import SearchBar from "../../components/SearchBar";

export default function CoursesManagement() {
    const { user, loading } = useUserData();
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCourses, setFilteredCourses] = useState<any[]>([]);

    const addOnClick = () => {
        setShowAddPopup(true);
    };

    const handlePopupClose = () => {
        setShowAddPopup(false);
    };

    const handleSuccess = () => {
        refetch();
    };

    const token = useGetToken();
    const { courses, loading: loadingCourses, error, refetch } = useCoursesList(token || null);

    useEffect(() => {
        setFilteredCourses(
            courses.filter(
                (course) =>
                    course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    course.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, courses]);

    return (
        <>
            {loading && <LoadingPopup />}
            {showAddPopup && <AddCoursePopup onClose={handlePopupClose} onSuccess={handleSuccess} />}

            <SideNavigation type={user?.role || "STUDENT"} activeItem="manage-courses" />

            <PageContent>
                <PageHeader
                    title="Courses Management - create and manage courses"
                    button={
                        <Button
                            variant="contained"
                            style={{ minWidth: 150 }}
                            endIcon={
                                <img
                                    src="/add-line.svg"
                                    alt=""
                                    style={{ width: 20, height: 20, filter: "var(--white-filter)" }}
                                />
                            }
                            onClick={addOnClick}
                        >
                            Add course
                        </Button>
                    }
                />
                <div className="courses-search-container">
                    <SearchBar value={searchTerm} onChange={setSearchTerm} />
                </div>
                <div className="courses-list">
                    {filteredCourses.length === 0 && <div style={{ color: "white" }}>No courses found.</div>}
                    {filteredCourses.map((course) => (
                        <CourseListItem
                            key={course._id}
                            icon={course.icon}
                            courseName={course.courseName}
                            courseCode={course.courseCode}
                        />
                    ))}
                </div>
            </PageContent>
        </>
    );
}
