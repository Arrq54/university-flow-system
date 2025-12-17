import { Response } from "express";
import { Course } from "../../../models/Course";
import { UserRoles } from "../../../utils/UserRoles";
import { AuthRequest } from "../../../types/AuthRequest";

interface AddCourseRequestBody {
    courseName: string;
    courseCode: string;
    icon: string;
}

export const addCourse = async (req: AuthRequest, res: Response) => {
    const { courseName, courseCode, icon } = req.body as AddCourseRequestBody;

    if (!req.user || req.user.role !== UserRoles.ADMIN) {
        return res.status(403).json({ message: "Access denied. Only admins can add courses." });
    }

    try {
        const courseExists = await Course.findOne({ courseCode });
        if (courseExists) {
            return res.status(400).json({ message: "Course with this code already exists" });
        }

        const course = await Course.create({
            courseName,
            courseCode,
            icon,
        });

        res.status(201).json({
            message: "Course added successfully",
            data: {
                _id: course._id,
                classes: [],
                assignedStudents: [],
                assignedTeachers: [],
                courseName: course.courseName,
                courseCode: course.courseCode,
                icon: course.icon,
            },
        });
    } catch (error) {
        console.error("Error adding course:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
