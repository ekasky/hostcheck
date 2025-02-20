import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppErrors';

export const errorHandler = (error: AppError, req: Request, res: Response, next: NextFunction) => {

    if(error instanceof AppError) {

        res.status(error.status).json({
            message: error.message
        });

    }
    // Handle any undefined errors
    else {

        res.status(500).json({
            message: 'Internal Server Error'
        });

    }

};