import * as XLSX from "xlsx";
import type { Course } from "../../../hooks/useTeacherData";
import type { StudentWithGrades } from "../components/CoursesList/components/CourseWrapper";

export const exportCourseToExcel = (
    course: Course,
    getStudentsWithGrades: (classItem: Course["classes"][0]) => StudentWithGrades[]
) => {
    const workbook = XLSX.utils.book_new();
    const worksheetData: (string | number | null)[][] = [];

    worksheetData.push([course.courseName]);
    worksheetData.push([]);

    course.classes.forEach((classItem) => {
        const studentsWithGrades = getStudentsWithGrades(classItem);

        worksheetData.push([classItem.className]);
        worksheetData.push(["Student", "Final Grade"]);

        studentsWithGrades.forEach((student) => {
            worksheetData.push([student.name, student.finalGrade ?? ""]);
        });

        worksheetData.push([]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    worksheet["!cols"] = [{ wch: 30 }, { wch: 15 }];
    worksheet["!merges"] = [];

    worksheet["!merges"]!.push({ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } });

    let currentRow = 2;

    course.classes.forEach(() => {
        worksheet["!merges"]!.push({ s: { r: currentRow, c: 0 }, e: { r: currentRow, c: 1 } });

        const classNameCell = worksheet[XLSX.utils.encode_cell({ r: currentRow, c: 0 })];
        if (classNameCell) {
            classNameCell.s = {
                font: { bold: true, size: 12 },
                fill: { fgColor: { rgb: "D3D3D3" } },
            };
        }

        currentRow += 2;
        const classIndex = course.classes.findIndex(
            (c) => c.className === worksheet[XLSX.utils.encode_cell({ r: currentRow - 2, c: 0 })].v
        );
        const studentsWithGrades = getStudentsWithGrades(course.classes[classIndex !== -1 ? classIndex : 0]);

        currentRow += studentsWithGrades.length + 1;
    });

    const courseTitleCell = worksheet[XLSX.utils.encode_cell({ r: 0, c: 0 })];
    if (courseTitleCell) {
        courseTitleCell.s = {
            font: { bold: true, size: 16 },
            fill: { fgColor: { rgb: "4472C4" } },
            alignment: { horizontal: "center", vertical: "center" },
        };
    }

    XLSX.utils.book_append_sheet(workbook, worksheet, "Grades");
    XLSX.writeFile(workbook, `${course.courseName}.xlsx`);
};
