import { Request, Response } from "express";
import { User } from "../../../models/User";
interface AddUserRequestBody {
    name: string;
    surname: string;
    email: string;
    password: string;
    title: string;
    role: string;
}
export const addUser = async (req: Request, res: Response) => {
    const { name, surname, email, password, title, role } = req.body as AddUserRequestBody;

    try {
        await User.create({ name, surname, email, password, title, role });
        res.status(200).json({
            message: "User added successfully",
            data: { name: name + " " + surname, email, title, role },
        });
    } catch (error) {
        console.error("Error adding user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
