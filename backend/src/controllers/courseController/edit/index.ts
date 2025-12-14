import { Request, Response } from "express";
import mongoose from "mongoose";
import { Course } from "../../../models/Course";

interface UpdateCourseRequestBody {
    courseName?: string;
    courseCode?: string;
    icon?: string;
}

export const editCourse = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { courseName, courseCode, icon } = req.body as UpdateCourseRequestBody;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid course ID" });
        }

        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        if (courseCode && courseCode !== course.courseCode) {
            const existingCourse = await Course.findOne({ courseCode });
            if (existingCourse) {
                return res.status(400).json({ message: "Course with this code already exists" });
            }
        }

        if (courseName) course.courseName = courseName;
        if (courseCode) course.courseCode = courseCode;
        if (icon) course.icon = icon;

        await course.save();

        res.status(200).json({
            message: "Course updated successfully",
            data: {
                _id: course._id,
                courseName: course.courseName,
                courseCode: course.courseCode,
                icon: course.icon,
            },
        });
    } catch (error) {
        console.error("Error updating course:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
