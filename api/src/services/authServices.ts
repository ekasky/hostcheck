import argon2 from 'argon2';
import { ValidatedRegisterData } from '../validators/auth';
import { ConflictError, HashingError } from '../utils/AppErrors';
import User, { Provider } from '../models/User';


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
            twoFaVerified: false
        });

        const { password, twoFaSecret, twoFaBackupCodes, ...safeUser } = user.toJSON();

        // Return the user
        return safeUser;


    }
    catch(error: any) {

        // Let the controller handle the error
        throw error;

    }

};
