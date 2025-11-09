import { Request, Response } from "express";
import { User } from "../../../../models/User";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({ role: { $in: ["STUDENT", "TEACHER"] } });
        const responseUsers = users.map((user) => ({
            _id: user._id,
            name: user.name,
            email: user.email,
            title: user.title,
            role: user.role,
        }));
        res.status(200).json(responseUsers);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
