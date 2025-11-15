import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
    courseName: string;
    courseCode: string;
    icon: string;
    createdAt: Date;
    updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
    {
        courseName: { type: String, required: true },
        courseCode: { type: String, required: true, unique: true },
        icon: { type: String, required: true },
    },
    { timestamps: true }
);

export const Course = mongoose.model<ICourse>("Course", courseSchema);
