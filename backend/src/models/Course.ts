import mongoose, { Schema, Document } from "mongoose";

export interface ISchedule {
    _id?: string;
    assignedTeacher: string;
    className: string;
    weekday: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
    startTime: string;
    endTime: string;

    grades: {
        studentId: string;
        grade: number;
        description?: string;
    }[];
    finalGrades: {
        studentId: string;
        grade: number;
    }[];
}

export interface ICourse extends Document {
    courseName: string;
    courseCode: string;
    icon: string;

    assignedStudents: string[];
    assignedTeachers: string[];

    classes: ISchedule[];
    createdAt: Date;
    updatedAt: Date;
}

const scheduleSchema = new Schema<ISchedule>(
    {
        assignedTeacher: { type: String, required: true },
        className: { type: String, required: true },
        weekday: {
            type: String,
            enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            required: true,
        },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        grades: [
            {
                studentId: { type: String, required: true },
                grade: { type: Number, required: true },
                description: { type: String },
            },
        ],
        finalGrades: [
            {
                studentId: { type: String, required: true },
                grade: { type: Number, required: true },
            },
        ],
    },
    { _id: true }
);

const courseSchema = new Schema<ICourse>(
    {
        courseName: { type: String, required: true },
        courseCode: { type: String, required: true, unique: true },
        icon: { type: String, required: true },
        assignedStudents: [{ type: String, required: true }],
        assignedTeachers: [{ type: String, required: true }],
        classes: [scheduleSchema],
    },
    { timestamps: true }
);

export const Course = mongoose.model<ICourse>("Course", courseSchema);
