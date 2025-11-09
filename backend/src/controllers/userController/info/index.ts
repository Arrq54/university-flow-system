import { Request, Response } from "express";

export interface ExtendedRequest extends Request {
    user?: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
}

export const getUserInfo = async (req: ExtendedRequest, res: Response) => {
    const user = req.user;
    res.status(200).json({ user });
};
