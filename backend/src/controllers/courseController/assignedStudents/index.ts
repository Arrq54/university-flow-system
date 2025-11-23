import { Request, Response } from "express";
import { Course } from "../../../models/Course";
export interface ExtendedRequest extends Request {
    body: {
        courseCode: string;
        studentIds: string[];
    };
}

export const assignStudentsToCourse = async (req: ExtendedRequest, res: Response) => {
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
