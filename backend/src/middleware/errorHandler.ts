import { Request, Response, NextFunction } from 'express';
import logger from '../utils/Logger';
import AppError, { PasswordHashError, PasswordVerificationError } from '../errors/AppError';

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction): void => {
    const requestInfo = `[${req.method}] ${req.url} - IP: ${req.ip}`;

    if (error instanceof PasswordHashError) {
        logger.error(
            `[AppError: PasswordHasingError] - CRITICAL - STATUS: ${error.status} - MESSAGE: ${error.message}`,
        );

        res.status(500).json({
            message: 'Internal server error - hasing issue',
        });
    } else if (error instanceof PasswordVerificationError) {
        logger.error(
            `[AppError: PasswordVerificationError] - CRITICAL - STATUS: ${error.status} - MESSAGE: ${error.message}`,
        );

        res.status(500).json({
            message: 'Internal server error - verification issue',
        });
    } else if (error instanceof AppError) {
        logger.error(`[AppError] - STATUS: ${error.status} - MESSAGE: ${error.message} - REQUEST: ${requestInfo}`);

        res.status(error.status).json({
            message: error.message,
        });
    } else {
        logger.error(
            `[Unhandled Error] - MESSAGE: ${error.message} - REQUEST: ${requestInfo} - STACK TRACE: ${error.stack}`,
        );

        res.status(500).json({
            message: 'Internal server error',
        });
    }
};
