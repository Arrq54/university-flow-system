import { Request, Response } from "express";
import { Course } from "../../../models/Course";
import { ObjectId } from "mongodb";

export interface ExtendedRequest extends Request {
    body: {
        courseCode: string;
        scheduleId: string;
    };
}

export const deleteScheduleItem = async (req: ExtendedRequest, res: Response) => {
    try {
        const { courseCode, scheduleId } = req.body;

        const course = await Course.findOne({ courseCode });

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const initialLength = course.classes.length;
        course.classes = course.classes.filter((item: any) => item._id?.toString() !== scheduleId);

        if (course.classes.length === initialLength) {
            return res.status(404).json({ message: "Schedule item not found" });
        }

        await course.save();

        res.status(200).json({ message: "Schedule item deleted successfully" });
    } catch (error) {
        console.error("Error deleting schedule item:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
