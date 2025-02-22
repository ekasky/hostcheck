import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export interface ValidatedSignupRequest extends Request {
    validatedBody: z.infer<typeof AuthValidation.signupSchema>;
}

class AuthValidation {
    /* Signup Validation Schema */
    public static signupSchema = z
        .object({
            firstName: z.string().min(2).max(100),
            lastName: z.string().min(2).max(100),
            email: z.string().email(),
            password: z.string().min(16).max(128),
        })
        .strict();

    /* Middleware to validate signup input */
    public static validateSignup(req: Request, res: Response, next: NextFunction) {
        try {
            const parsedData = AuthValidation.signupSchema.parse(req.body);
            (req as ValidatedSignupRequest).validatedBody = parsedData;
            next();
        } catch (error: any) {
            next(error);
        }
    }
}

export default AuthValidation;
