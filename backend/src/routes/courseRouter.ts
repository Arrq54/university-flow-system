import { Router } from "express";
import courseController from "../controllers/courseController";
import { protect } from "../middleware/authMiddleware";

export const courseRouter = Router();

courseRouter.get("/get/all", courseController.getAllCourses);
courseRouter.get("/get/:courseCode", courseController.getCourseByCode);
courseRouter.post("/add", protect, courseController.addCourse);
courseRouter.post("/assign-students", protect, courseController.assignStudentsToCourse);
courseRouter.post("/assign-teachers", protect, courseController.assignTeachersToCourse);
courseRouter.post("/add-schedule-item", protect, courseController.addScheduleItem);
courseRouter.post("/delete-schedule-item", protect, courseController.deleteScheduleItem);

courseRouter.post("/:courseCode/class/:classId/grades", protect, courseController.addGrades);

courseRouter.post("/:courseCode/class/:classId/final-grade", protect, courseController.updateFinalGrade);

courseRouter.delete("/delete/:courseCode", protect, courseController.deleteCourse);
