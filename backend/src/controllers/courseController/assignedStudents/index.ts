import { Response } from "express";
import { Course } from "../../../models/Course";
import { UserRoles } from "../../../utils/UserRoles";
import { AuthRequest } from "../../../types/AuthRequest";

export interface ExtendedRequest extends AuthRequest {
    body: {
        courseCode: string;
        studentIds: string[];
    };
}

export const assignStudentsToCourse = async (req: ExtendedRequest, res: Response) => {
    if (!req.user || req.user.role !== UserRoles.ADMIN) {
        return res.status(403).json({ message: "Access denied. Only admins can assign students." });
    }

    try {
        const { courseCode, studentIds } = req.body;

        const course = await Course.updateOne({ courseCode }, { assignedStudents: studentIds });

        if (course.matchedCount === 0) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({ message: "Students assigned successfully" });
    } catch (error) {
        console.error("Error assigning students to course:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
