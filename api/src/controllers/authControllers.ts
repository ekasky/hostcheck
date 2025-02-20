import { NextFunction, Request, Response } from 'express';
import { registerSchema, ValidatedRegisterData } from '../validators/auth';
import { registerLocal } from '../services/authServices';

export const register = async (req: Request, res: Response, next: NextFunction) => {


    try {

        // Validate the input fields
        const validatedData: ValidatedRegisterData = registerSchema.parse(req.body);

        // Call the register local user service
        const user = await registerLocal(validatedData);

        // return success response if no errors occured
        res.status(201).json({
            message: 'User created successfully',
            user
        });

    }
    catch(error: any) {

        next(error);

    }

};
