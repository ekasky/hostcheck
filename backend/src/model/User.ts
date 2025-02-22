import { DataTypes, Model, Optional } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import argon2 from 'argon2';
import sequelize from '../config/Database';
import { PasswordHashError, PasswordVerificationError, UndefinedValueError } from '../errors/AppError';

export enum Provider {
    LOCAL = 'local',
    GOOGLE = 'google',
}

// Prevent Provider Enum Modification
Object.freeze(Provider);

interface UserAttributes {
    id: string;
    firstName: string;
    lastName: string;
    provider: Provider;
    email: string;
    password?: string;
    googleId?: string;
    googleToken?: string;
    accountVerified: boolean;
    accountVerificationCode?: string;
    accountVerificationCodeExpires?: Date;
    twoFaEnabled: boolean;
    twoFaSecret?: string;
    twoFaVerified: boolean;
    twoFaBackupCodes?: string[];
    passwordResetToken?: string;
    passwordResetTokenExpires?: Date;
    profileImage?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'password'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare id: string;
    declare firstName: string;
    declare lastName: string;
    declare provider: Provider;
    declare email: string;
    declare password: string;
    declare googleId: string;
    declare googleToken: string;
    declare accountVerified: boolean;
    declare accountVerificationCode: string;
    declare accountVerificationCodeExpires: Date;
    declare twoFaEnabled: boolean;
    declare twoFaSecret: string;
    declare twoFaVerified: boolean;
    declare twoFaBackupCodes: string[];
    declare passwordResetToken: string;
    declare passwordResetTokenExpires: Date;
    declare profileImage: string;

    public toJSON(): Partial<UserAttributes> {
        const userObject = { ...this.get() };
        delete userObject.password;
        delete userObject.accountVerificationCode;
        delete userObject.accountVerificationCodeExpires;
        delete userObject.passwordResetToken;
        delete userObject.passwordResetTokenExpires;
        delete userObject.twoFaSecret;
        delete userObject.twoFaBackupCodes;
        delete userObject.googleId;
        delete userObject.googleToken;
        return userObject;
    }
}

User.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },

        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        provider: {
            type: DataTypes.ENUM(...Object.values(Provider)),
            allowNull: false,
            defaultValue: Provider.LOCAL,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },

        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        googleId: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },

        googleToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        accountVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

        accountVerificationCode: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        accountVerificationCodeExpires: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        twoFaEnabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

        twoFaSecret: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        twoFaVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

        twoFaBackupCodes: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
        },

        passwordResetToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        passwordResetTokenExpires: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        profileImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'Users',
    },
);

export default User;
