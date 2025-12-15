import { Router } from "express";
import courseController from "../controllers/courseController";

export const courseRouter = Router();

courseRouter.get("/get/all", courseController.getAllCourses);
courseRouter.get("/get/:courseCode", courseController.getCourseByCode);
courseRouter.post("/add", courseController.addCourse);
courseRouter.post("/assign-students", courseController.assignStudentsToCourse);
courseRouter.post("/assign-teachers", courseController.assignTeachersToCourse);
courseRouter.post("/add-schedule-item", courseController.addScheduleItem);
courseRouter.post("/delete-schedule-item", courseController.deleteScheduleItem);
courseRouter.post("/:courseId/class/:classId/grades", courseController.addGrades);
courseRouter.post("/:courseId/class/:classId/final-grade", courseController.updateFinalGrade);
courseRouter.put("/edit/:id", courseController.editCourse);
courseRouter.delete("/delete/:courseCode", courseController.deleteCourse);
