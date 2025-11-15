import { Router } from "express";
import courseController from "../controllers/courseController";

export const courseRouter = Router();

courseRouter.get("/get/all", courseController.getAllCourses);
courseRouter.get("/get/:courseCode", courseController.getCourseByCode);
courseRouter.post("/add", courseController.addCourse);
courseRouter.put("/edit/:id", courseController.editCourse);
courseRouter.delete("/delete/:id", courseController.deleteCourse);
