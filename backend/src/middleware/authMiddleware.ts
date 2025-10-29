import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";

interface JwtPayload {
    id: string;
}

interface AuthRequest extends Request {
    user?: any | null;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;

            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized, invalid token" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};
