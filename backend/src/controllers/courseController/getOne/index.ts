import { Request, Response } from "express";
import { Course } from "../../../models/Course";
import { User } from "../../../models/User";

export const getCourseByCode = async (req: Request, res: Response) => {
    try {
        const { courseCode } = req.params;

        const course = await Course.findOne({ courseCode }).lean();

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const assignedStudents = await User.find({
            _id: { $in: course.assignedStudents },
        }).select("-password");

        const assignedTeachers = await User.find({
            _id: { $in: course.assignedTeachers },
        }).select("-password");

        res.status(200).json({
            message: "Course retrieved successfully",
            data: {
                ...course,
                assignedStudents,
                assignedTeachers,
            },
        });
    } catch (error) {
        console.error("Error getting course:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
