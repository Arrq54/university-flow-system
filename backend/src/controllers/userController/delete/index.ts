import { Request, Response } from "express";
import { User } from "../../../models/User";

export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: `User with ID ${userId} deleted successfully.` });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user.", error });
    }
};
