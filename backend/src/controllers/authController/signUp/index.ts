import { Request, Response } from "express";
import { User } from "../../../models/User";
import { generateToken } from "../../../utils/auth";
export const signUp = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({ name, email, password, role });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken((user._id as string).toString()),
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
