import { Request, Response } from "express";
import { Course } from "../../../models/Course";

export const addGrades = async (req: Request, res: Response) => {
    try {
        const { courseId, classId } = req.params;
        const { description, grades } = req.body;

        if (!courseId || !classId || !grades || !Array.isArray(grades)) {
            return res.status(400).json({
                message: "courseId, classId, and grades array are required",
            });
        }

        if (grades.length === 0) {
            return res.status(400).json({ message: "At least one grade must be provided" });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const classItem = course.classes.find((cls) => cls._id?.toString() === classId);
        if (!classItem) {
            return res.status(404).json({ message: "Class not found" });
        }

        if (!classItem.grades) {
            classItem.grades = [];
        }

        grades.forEach((gradeEntry: { studentId: string; grade: number | null }) => {
            if (gradeEntry.grade !== null && gradeEntry.grade !== undefined) {
                classItem.grades.push({
                    studentId: gradeEntry.studentId,
                    grade: gradeEntry.grade,
                    description: description || undefined,
                });
            }
        });

        course.markModified("classes");

        await course.save();

        res.status(200).json({
            message: "Grades added successfully",
            course,
        });
    } catch (error) {
        console.error("Error adding grades:", error);
        res.status(500).json({ message: "Error adding grades" });
    }
};
