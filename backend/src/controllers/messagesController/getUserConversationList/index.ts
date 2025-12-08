import { Request, Response } from "express";

export const getUserConversationList = (req: Request, res: Response) => {
    res.status(200).send("User conversation list");
};
