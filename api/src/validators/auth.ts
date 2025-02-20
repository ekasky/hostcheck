import { z } from 'zod';

export const registerSchema = z.object({
    
    firstName: z.string().min(1).max(50).regex(/^[^<>]*$/),
    lastName: z.string().min(1).max(50).regex(/^[^<>]*$/),
    email: z.string().email(),
    password: z.string().min(16).max(128)

}).strict();

export type ValidatedRegisterData = z.infer<typeof registerSchema>;
