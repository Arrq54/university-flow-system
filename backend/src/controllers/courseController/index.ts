import { addCourse } from "./add";
import { editCourse } from "./edit";
import { deleteCourse } from "./delete";
import { getAllCourses } from "./getAll";
import { getCourseByCode } from "./getOne";
import { assignStudentsToCourse } from "./assignedStudents";
import { assignTeachersToCourse } from "./assignedTeachers";
import { addScheduleItem } from "./addScheduleItem";
import { deleteScheduleItem } from "./deleteScheduleItem";
import { updateFinalGrade } from "./updateFinalGrade";
import { addGrades } from "./addGrades";

export default {
    addCourse,
    editCourse,
    deleteCourse,
    getAllCourses,
    getCourseByCode,
    assignStudentsToCourse,
    assignTeachersToCourse,
    addScheduleItem,
    deleteScheduleItem,
    updateFinalGrade,
    addGrades,
};
