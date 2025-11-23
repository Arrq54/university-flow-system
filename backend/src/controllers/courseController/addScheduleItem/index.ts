import { Request, Response } from "express";
import { Course } from "../../../models/Course";

export interface ExtendedRequest extends Request {
    body: {
        courseCode: string;
        className: string;
        assignedTeacher: string;
        weekday: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
        startTime: string;
        endTime: string;
    };
}

export const addScheduleItem = async (req: ExtendedRequest, res: Response) => {
    try {
        const { courseCode, className, assignedTeacher, weekday, startTime, endTime } = req.body;

        const course = await Course.findOne({ courseCode });

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const newScheduleItem = {
            className,
            assignedTeacher,
            weekday,
            startTime,
            endTime,
        };

        // @ts-ignore
        course.classes.push(newScheduleItem);
        await course.save();

        res.status(200).json({ message: "Schedule item added successfully", data: newScheduleItem });
    } catch (error) {
        console.error("Error adding schedule item:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
