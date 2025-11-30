import { Request, Response } from "express";
import { Course } from "../../../models/Course";
export const getTeacherData = async (req: Request, res: Response) => {
    const { id } = req.params;
    const courses = await getCoursesForTeacher(id);
    const filteredCourses = courses.map((course) => {
        const courseObj = course.toObject();
        courseObj.classes = courseObj.classes.filter((cls) => String(cls.assignedTeacher) === String(id));
        return courseObj;
    });
    res.status(200).json({ message: "Teacher data fetched successfully", courses: filteredCourses });
};

export const getCoursesForTeacher = async (teacherId: string) => {
    try {
        return await Course.find({ assignedTeachers: teacherId });
    } catch (error) {
        console.error(`Error fetching courses for teacher ID ${teacherId}:`, error);
        throw error;
    }
};
