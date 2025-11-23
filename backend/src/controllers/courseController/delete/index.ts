import { Request, Response } from "express";
import mongoose from "mongoose";
import { Course } from "../../../models/Course";

export const deleteCourse = async (req: Request, res: Response) => {
    const { courseCode } = req.params;
    console.log("Deleting course with code:", courseCode);
    try {
        const course = await Course.findOneAndDelete({ courseCode });
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({
            message: "Course deleted successfully",
            data: {
                _id: course._id,
                courseName: course.courseName,
                courseCode: course.courseCode,
            },
        });
    } catch (error) {
        console.error("Error deleting course:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
