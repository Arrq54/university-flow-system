import { Request, Response } from "express";
import mongoose from "mongoose";
import { User } from "../../../models/User";

import jwt from "jsonwebtoken";

export const verifyToken = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ valid: true, user });
    } catch (err) {
        console.error(err);
        res.status(401).json({ valid: false, message: "Invalid token" });
    }
};
