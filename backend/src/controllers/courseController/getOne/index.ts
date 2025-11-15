import { Request, Response } from "express";
import { Course } from "../../../models/Course";

export const getCourseByCode = async (req: Request, res: Response) => {
    try {
        const { courseCode } = req.params;

        const course = await Course.findOne({ courseCode });

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({
            message: "Course retrieved successfully",
            data: course,
        });
    } catch (error) {
        console.error("Error getting course:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
