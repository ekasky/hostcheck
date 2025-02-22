import argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import { ConflictError, PasswordHashError } from '../errors/AppError';
import User, { Provider } from '../model/User';
import ENV from '../config/Env';
import emailService from './email/EmailService';
import logger from '../utils/Logger';

class AuthService {
    private static instance: AuthService;

    private constructor() {}

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    private static async hashPassword(password: string): Promise<string> {
        try {
            return await argon2.hash(password, { type: argon2.argon2id });
        } catch (error: any) {
            throw new PasswordHashError('Error hasing password');
        }
    }

    private static generateVerificationCode(): string {
        return uuidv4();
    }

    private async sendAccountVerificationEmail(user: User): Promise<void> {
        const verificationCode: string = AuthService.generateVerificationCode();

        // Store the verification code and set its experation date in the db
        user.accountVerificationCode = verificationCode;
        user.accountVerificationCodeExpires = new Date(Date.now() + 15 * 60 * 60 * 1000); // 15 minutes
        await user.save();

        // Generate the account verification url
        const verificationUrl: string = `${ENV.FRONTEND_URL}/api/auth/verify-account?code=${verificationCode}`;

        // Create the email to be sent to the user
        const subject: string = `Verify your account`;
        const htmlContent: string = `
            <h1>Verify Your Account</h1>
            <p>Click <a href=${verificationUrl}>here</a> to verify your account.</p>
            <p>This link will expire in 15 minutes.</p>
        `;
        const textContent: string = `Click the link to verify your account: ${verificationUrl}`;

        // Send the account verification email
        await emailService.sendEmail(user.email, subject, htmlContent, textContent);
    }

    /* Sign Up New Local User */
    public async signup(firstName: string, lastName: string, email: string, password: string): Promise<User> {
        // Check if a user already exisits with that email address
        const exisitingUser: User | null = await User.findOne({ where: { email } });

        // If there is a existing user throw a 409 Conflict Error
        if (exisitingUser) {
            throw new ConflictError('Email already is use');
        }

        // Hash the user's password
        const hashedPassword: string = await AuthService.hashPassword(password);

        // Create the new user in the Users table of the database
        const newUser: User = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountVerified: false,
            provider: Provider.LOCAL,
            twoFaEnabled: false,
            twoFaVerified: false,
        });
        logger.info('New user created:', newUser.get('email'));

        // Send a account verification email to the registered email address
        await this.sendAccountVerificationEmail(newUser);

        // Return the user
        return newUser;
    }
}

export default AuthService.getInstance();
