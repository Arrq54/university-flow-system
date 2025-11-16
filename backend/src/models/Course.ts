import mongoose, { Schema, Document } from "mongoose";

export interface ISchedule {
    _id?: string;
    weekday: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
    startTime: string;
    endTime: string;
}

export interface ICourseClasses {
    _id?: string;
    assignedTeachersId: string[];
    schedule: ISchedule[];
}

export interface ICourse extends Document {
    courseName: string;
    courseCode: string;
    icon: string;
    classes: ICourseClasses[];
    createdAt: Date;
    updatedAt: Date;
}

const scheduleSchema = new Schema<ISchedule>(
    {
        weekday: {
            type: String,
            enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            required: true,
        },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
    },
    { _id: true }
);

const courseClassesSchema = new Schema<ICourseClasses>(
    {
        assignedTeachersId: [{ type: String, required: true }],
        schedule: [scheduleSchema],
    },
    { _id: true }
);

const courseSchema = new Schema<ICourse>(
    {
        courseName: { type: String, required: true },
        courseCode: { type: String, required: true, unique: true },
        icon: { type: String, required: true },
        classes: [courseClassesSchema],
    },
    { timestamps: true }
);

export const Course = mongoose.model<ICourse>("Course", courseSchema);
