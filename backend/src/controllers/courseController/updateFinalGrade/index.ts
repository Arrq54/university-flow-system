import { Response } from "express";
import { Course } from "../../../models/Course";
import { UserRoles } from "../../../utils/UserRoles";
import { AuthRequest } from "../../../types/AuthRequest";

export const updateFinalGrade = async (req: AuthRequest, res: Response) => {
    if (!req.user || req.user.role !== UserRoles.TEACHER) {
        console.log("Unauthorized access attempt by user:", req.user);
        return res.status(403).json({ message: "Access denied. Only teachers can update final grades." });
    }

    try {
        const { courseCode, classId } = req.params;
        const { studentId, grade } = req.body;

        if (!studentId || grade === undefined) {
            return res.status(400).json({ message: "studentId and grade are required" });
        }

        const course = await Course.findOne({ courseCode });
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const classItem = course.classes.find((cls) => cls._id?.toString() === classId);
        if (!classItem) {
            return res.status(404).json({ message: "Class not found" });
        }

        if (!classItem.finalGrades) {
            classItem.finalGrades = [];
        }

        const existingGradeIndex = classItem.finalGrades.findIndex((g) => g.studentId === studentId);

        if (existingGradeIndex >= 0) {
            classItem.finalGrades[existingGradeIndex].grade = grade;
        } else {
            classItem.finalGrades.push({ studentId, grade });
        }

        await course.save();

        res.status(200).json({ message: "Final grade updated successfully", course });
    } catch (error) {
        console.error("Error updating final grade:", error);
        res.status(500).json({ message: "Error updating final grade" });
    }
};
