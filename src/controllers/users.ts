import {  createCarZSchema } from "../models/users";
import { Request, Response } from "express";

export class UserController {

    createUser = (req: Request, res: Response): void => {
        
        const validation = createCarZSchema.safeParse(req.body);

        if (!validation.success) {
            res.status(400).json({
                message: "Invalid car data",
                errors: validation.error.issues,
            })
            return;
        }

        console.log(validation.data);
        res.status(200).json(validation.data);

    }
}