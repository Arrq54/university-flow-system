import { Request, Response } from "express";
import { Course } from "../../../models/Course";

export interface ExtendedRequest extends Request {
    body: {
        courseCode: string;
        teacherIds: string[];
    };
}

export const assignTeachersToCourse = async (req: ExtendedRequest, res: Response) => {
    try {
        const { courseCode, teacherIds } = req.body;

        const course = await Course.updateOne({ courseCode }, { assignedTeachers: teacherIds });

        if (course.matchedCount === 0) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({ message: "Teachers assigned successfully" });
    } catch (error) {
        console.error("Error assigning teachers to course:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
