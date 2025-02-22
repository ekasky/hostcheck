import argon2 from 'argon2';
import { v4 as uuid } from 'uuid';
import { ValidatedRegisterData } from '../validators/auth';
import { ConflictError, HashingError } from '../utils/AppErrors';
import User, { Provider } from '../models/User';
import { accountVerificationTemplate } from '../emails/templates/accountVerification';
import { sendEmail } from '../emails/emailService';
import { FRONTEND_URL } from '../config/env';


const hashPassword = async (password: string): Promise<string> => {

    try {
        return await argon2.hash(password, { type: argon2.argon2id });
    }
    catch(error: any) {
        throw new HashingError(`Password hashing failed: ${error.message}`);
    }

};

const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {

    return await argon2.verify(hashedPassword, password);

};

const generateAccountVerificationLink = async (userId: string): Promise<string> => {

    // Generate a token
    const token: string = uuid();

    // Calculate expiration time (15 minutes from now)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    // Store the token in the user's record
    const user: User | null = await User.findByPk(userId);

    if(!user) {
        throw new Error('User not found for verification link generation');
    }

    await user.update({ accountVerificationCode: token, accountVerificationCodeExpires: expiresAt });

    // Create and return the verification link
    return `${FRONTEND_URL}/api/auth/verify-account?token=${token}`;

};

export const registerLocal = async (registerData: ValidatedRegisterData) => {

    try {

        // Check if the email is already in use
        const existingUser: User | null = await User.findOne({ where: { email: registerData.email } });

        if(existingUser) {
            throw new ConflictError('Email is already in use');
        }

        // Hash the user's password for safe storage
        const hash: string = await hashPassword(registerData.password); 

        // Create the new user
        const user: User = await User.create({
            firstName: registerData.firstName,
            lastName: registerData.lastName,
            email: registerData.email,
            password: hash,
            provider: Provider.LOCAL,
            twoFaEnabled: false,
            twoFaVerified: false,
            accountVerified: false,
        });

        // Generate a inital account verification link
        const verificationLink: string = await generateAccountVerificationLink(user.id);

        // Send a account verification email
        const emailContent = accountVerificationTemplate(user.firstName, verificationLink);
        await sendEmail(user.email, emailContent.subject, emailContent.bodyHtml, emailContent.bodyText);

        const { password, twoFaSecret, twoFaBackupCodes, ...safeUser } = user.toJSON();

        // Return the user
        return safeUser;


    }
    catch(error: any) {

        // Let the controller handle the error
        throw error;

    }

};
