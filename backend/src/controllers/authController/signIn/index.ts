import { Request, Response } from "express";
import mongoose from "mongoose";
import { User } from "../../../models/User";
import { generateToken } from "../../../utils/auth";

export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // znajdź użytkownika po mailu
        const user = (await User.findOne({ email })) || null;
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // sprawdź hasło
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // wygeneruj token JWT
        const token = generateToken((user._id as mongoose.Types.ObjectId).toString());

        // odpowiedź
        res.status(200).json({
            _id: (user._id as mongoose.Types.ObjectId).toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            token,
        });
    } catch (error) {
        console.error("SignIn error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
