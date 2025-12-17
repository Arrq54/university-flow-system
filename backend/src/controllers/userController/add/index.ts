import { Request, Response } from "express";
import { User } from "../../../models/User";
import { AuthRequest } from "../../../types/AuthRequest";
import { UserRoles } from "../../../utils/UserRoles";
interface AddUserRequestBody {
    name: string;
    email: string;
    password: string;
    title: string;
    role: string;
}
export const addUser = async (req: AuthRequest, res: Response) => {
    if (!req.user || req.user.role !== UserRoles.ADMIN) {
        return res.status(403).json({ message: "Access denied. Only admin can access this data" });
    }
    const { name, email, password, title, role } = req.body as AddUserRequestBody;

    try {
        await User.create({ name: name, email, password, title, role });
        res.status(200).json({
            message: "User added successfully",
            data: { name, email, title, role },
        });
    } catch (error) {
        console.error("Error adding user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
