import { Request, Response } from "express";
import { Course } from "../../../models/Course";
export const getTeacherData = async (req: Request, res: Response) => {
    const { id } = req.params;
    const courses = await getCoursesForTeacher(id);
    courses.map((course) => {
        course.classes = course.classes.filter((cls) => cls.assignedTeacher === id);
    });
    res.status(200).json({ message: "Teacher data fetched successfully", courses });
};

export const getCoursesForTeacher = async (teacherId: string) => {
    try {
        return await Course.find({ assignedTeachers: teacherId });
    } catch (error) {
        console.error(`Error fetching courses for teacher ID ${teacherId}:`, error);
        throw error;
    }
};
