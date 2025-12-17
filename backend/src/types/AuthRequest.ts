import { Request } from "express";
import { UserRoles } from "../utils/UserRoles";

export interface AuthRequest extends Request {
    user?: { role: UserRoles } | null;
}
