import { Request, Response } from "express";
import { Course } from "../../../models/Course";

export const updateFinalGrade = async (req: Request, res: Response) => {
    try {
        const { courseId, classId } = req.params;
        const { studentId, grade } = req.body;

        if (!studentId || grade === undefined) {
            return res.status(400).json({ message: "studentId and grade are required" });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const classItem = course.classes.find((cls) => cls._id?.toString() === classId);
        if (!classItem) {
            return res.status(404).json({ message: "Class not found" });
        }

        // Initialize finalGrades array if it doesn't exist
        if (!classItem.finalGrades) {
            classItem.finalGrades = [];
        }

        // Find existing final grade for this student
        const existingGradeIndex = classItem.finalGrades.findIndex((g) => g.studentId === studentId);

        if (existingGradeIndex >= 0) {
            // Update existing grade
            classItem.finalGrades[existingGradeIndex].grade = grade;
        } else {
            // Add new final grade
            classItem.finalGrades.push({ studentId, grade });
        }

        await course.save();

        res.status(200).json({ message: "Final grade updated successfully", course });
    } catch (error) {
        console.error("Error updating final grade:", error);
        res.status(500).json({ message: "Error updating final grade" });
    }
};
