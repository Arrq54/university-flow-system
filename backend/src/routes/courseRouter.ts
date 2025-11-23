import { Router } from "express";
import courseController from "../controllers/courseController";

export const courseRouter = Router();

courseRouter.get("/get/all", courseController.getAllCourses);
courseRouter.get("/get/:courseCode", courseController.getCourseByCode);
courseRouter.post("/add", courseController.addCourse);
courseRouter.post("/assign-students", courseController.assignStudentsToCourse);
courseRouter.post("/assign-teachers", courseController.assignTeachersToCourse);
courseRouter.post("/add-schedule-item", courseController.addScheduleItem);
courseRouter.put("/edit/:id", courseController.editCourse);
courseRouter.delete("/delete/:courseCode", courseController.deleteCourse);
