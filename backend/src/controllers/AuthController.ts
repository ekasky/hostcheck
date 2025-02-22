import { Request, Response, NextFunction } from 'express';
import { ValidatedSignupRequest } from '../middleware/AuthValidation';
import AuthService from '../services/AuthService';
import User from '../model/User';

class AuthController {
    private static instance: AuthController;

    private constructor() {}

    public static getInstance(): AuthController {
        if (!AuthController.instance) {
            AuthController.instance = new AuthController();
        }
        return AuthController.instance;
    }

    /* Signup Endpoint */
    public async signup(req: Request, res: Response, next: NextFunction) {
        try {
            // Get the signup data from the middleware to ensure it has been validated
            const { firstName, lastName, email, password } = (req as ValidatedSignupRequest).validatedBody;

            // Call the signup service
            const result: User = await AuthService.signup(firstName, lastName, email, password);

            // Remove sensitve data from the user before returning
            const safeUser = result.toJSON();

            // Send success response
            res.status(201).json({
                message: 'User registered successfully',
                user: safeUser,
            });
        } catch (error: any) {
            next(error);
        }
    }
}

export default AuthController.getInstance();
