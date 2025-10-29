import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IUser } from "../models/User";

export const generateToken = (userId: string) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET || "default_secret", {
        expiresIn: "30d",
    });
};

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export const comparePassword = async (plain: string, hashed: string) => {
    return await bcrypt.compare(plain, hashed);
};
