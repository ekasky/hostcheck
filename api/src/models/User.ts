import { DataTypes, Model, Optional } from 'sequelize';
import { v4 as uuid } from 'uuid';

import sequelize from '../config/db';

export enum Provider {
    LOCAL  = 'local',
    GOOGLE = 'google'
};

interface UserAttributes {
    id: string;
    firstName: string;
    lastName: string;
    provider: Provider;
    email: string;
    password?: string;
    googleId?: string;
    googleToken?: string;
    profileImage?: string;
    twoFaEnabled: boolean;
    twoFaSecret?: string;
    twoFaVerified: boolean;
    twoFaBackupCodes?: string[];
    passwordResetToken?: string;
    passwordResetTokenExpires?: Date;
};

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public firstName!: string;
    public lastName!: string;
    public provider!: Provider;
    public email!: string;
    public password?: string;
    public googleId?: string;
    public googleToken?: string;
    public profileImage?: string;
    public twoFaEnabled!: boolean;
    public twoFaSecret?: string;
    public twoFaVerified!: boolean;
    public twoFaBackupCodes?: string[];
    public passwordResetToken?: string;
    public passwordResetTokenExpires?: Date;
}

User.init(
    {

        id: {
            type: DataTypes.UUID,
            autoIncrement: true,
            primaryKey: true,
            defaultValue: () => uuid()
        },
        
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        lastName: {
            type: DataTypes.STRING,
            allowNull: false
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
                isEmail: true
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: true
        },

        googleId: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },

        googleToken: {
            type: DataTypes.STRING,
            allowNull: true
        },

        profileImage: {
            type: DataTypes.STRING,
            allowNull: true
        },

        twoFaEnabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        twoFaSecret: {
            type: DataTypes.STRING,
            allowNull: true
        },

        twoFaVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        
        twoFaBackupCodes: {
            type: DataTypes.JSON,
            allowNull: true
        },        

        passwordResetToken: {
            type: DataTypes.STRING,
            allowNull: true
        },

        passwordResetTokenExpires: {
            type: DataTypes.DATE,
            allowNull: true
        }

    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'User'
    }
);

export default User;