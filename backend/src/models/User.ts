import mongoose, { Schema, Document } from "mongoose";
import { UserRoles } from "../utils/UserRoles";
import bcrypt from "bcrypt";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRoles;
    title: string;
    matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: Object.values(UserRoles),
            default: UserRoles.STUDENT,
        },
        title: { type: String, default: "" },
    },
    { timestamps: true }
);
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
userSchema.methods.matchPassword = async function (entered: string) {
    return await bcrypt.compare(entered, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);
