import { Request, Response } from "express";
import { Course } from "../../../models/Course";

export const getAllCourses = async (req: Request, res: Response) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 });

        res.status(200).json({
            message: "Courses retrieved successfully",
            data: courses,
        });
    } catch (error) {
        console.error("Error getting courses:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
