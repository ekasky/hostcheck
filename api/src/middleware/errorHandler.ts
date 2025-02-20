import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppErrors';
import { ZodError } from 'zod';

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {

    console.log(error);

    if(error instanceof AppError) {

        res.status(error.status).json({
            message: error.message
        });

    }

    else if(error instanceof ZodError) {

        res.status(400).json({
            message: 'Input validation error',
            errors: error.errors.map(err => ({
                path: err.path.join('.'),
                message: err.message
            }))
        });

    }

    // Handle any undefined errors
    else {

        res.status(500).json({
            message: 'Internal Server Error'
        });

    }

};