import { Request, Response } from "express";
import { User } from "../../../models/User";
export const editUser = async (req: Request, res: Response) => {
    const { _id, user } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(_id, user, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
