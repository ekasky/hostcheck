import 'dotenv/config';
import { AppTypeError, UndefinedValueError } from '../errors/AppError';

interface EnvConfig {
    PORT: number;
    NODE_ENV: string;
    EMAIL_PROVIDER: string;
    MYSQL_ROOT_PASSWORD: string;
    MYSQL_DATABASE: string;
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;
    MYSQL_HOST: string;
    AWS_SES_REGION?: string;
    AWS_SES_ACCESS_KEY_ID: string;
    AWS_SES_SECRET_ACCESS_KEY: string;
    AWS_SES_SENDER_EMAIL: string;
    RESEND_API_KEY: string;
    RESEND_SENDER_EMAIL: string;
    TWILLO_SEND_GRID_API_KEY: string;
    TWILLO_SENDGRID_SENDER_EMAIL: string;
    NODE_MAILER_EMAIL_PROVIDER: string;
    NODE_MAILER_SMTP_HOST: string;
    NODE_MAILER_SMTP_PORT: number;
    NODE_MAILER_SMTP_SECURE: boolean;
    NODE_MAILER_SMTP_USER: string;
    NODE_MAILER_SMTP_PASSWORD: string;
    FRONTEND_URL: string;
}

class Env {
    private static instance: Env;
    public readonly config: EnvConfig;

    private constructor() {
        this.config = {
            PORT: Env.getNumber('PORT', 3000),
            NODE_ENV: Env.getString('NODE_ENV', 'development'),
            EMAIL_PROVIDER: Env.getString('EMAIL_PROVIDER'),
            MYSQL_ROOT_PASSWORD: Env.getString('MYSQL_ROOT_PASSWORD'),
            MYSQL_DATABASE: Env.getString('MYSQL_DATABASE'),
            MYSQL_USER: Env.getString('MYSQL_USER'),
            MYSQL_PASSWORD: Env.getString('MYSQL_PASSWORD'),
            MYSQL_HOST: Env.getString('MYSQL_HOST', 'localhost'),
            AWS_SES_REGION: Env.getString('AWS_SES_REGION', 'us-east-1'),
            AWS_SES_ACCESS_KEY_ID: Env.getString('AWS_SES_ACCESS_KEY_ID'),
            AWS_SES_SECRET_ACCESS_KEY: Env.getString('AWS_SES_SECRET_ACCESS_KEY'),
            AWS_SES_SENDER_EMAIL: Env.getString('AWS_SES_SENDER_EMAIL'),
            RESEND_API_KEY: Env.getString('RESEND_API_KEY'),
            RESEND_SENDER_EMAIL: Env.getString('RESEND_SENDER_EMAIL'),
            TWILLO_SEND_GRID_API_KEY: Env.getString('TWILLO_SEND_GRID_API_KEY'),
            TWILLO_SENDGRID_SENDER_EMAIL: Env.getString('TWILLO_SENDGRID_SENDER_EMAIL'),
            NODE_MAILER_EMAIL_PROVIDER: Env.getString('NODE_MAILER_EMAIL_PROVIDER'),
            NODE_MAILER_SMTP_HOST: Env.getString('NODE_MAILER_SMTP_HOST'),
            NODE_MAILER_SMTP_PORT: Env.getNumber('NODE_MAILER_SMTP_PORT'),
            NODE_MAILER_SMTP_SECURE: Env.getBoolean('NODE_MAILER_SMTP_SECURE'),
            NODE_MAILER_SMTP_USER: Env.getString('NODE_MAILER_SMTP_USER'),
            NODE_MAILER_SMTP_PASSWORD: Env.getString('NODE_MAILER_SMTP_PASSWORD'),
            FRONTEND_URL: Env.getString('FRONTEND_URL', 'http://localhost:3000'),
        };
    }

    public static getInstance(): Env {
        if (!Env.instance) Env.instance = new Env();
        return Env.instance;
    }

    private static getString(varName: string, defaultValue?: string): string {
        const value: string | undefined = process.env[varName] || defaultValue;

        if (value === undefined) throw new UndefinedValueError(varName);

        if (typeof value !== 'string') {
            throw new AppTypeError(`Environment variable ${varName} must be a string`);
        }

        return value;
    }

    private static getNumber(varName: string, defaultValue?: number): number {
        const rawValue = process.env[varName];
        const value = rawValue !== undefined ? Number(rawValue) : defaultValue;

        if (value === undefined) throw new UndefinedValueError(varName);

        if (isNaN(value)) {
            throw new AppTypeError(`Environment variable ${varName} must be a number`);
        }
        return value;
    }

    private static getBoolean(varName: string, defaultValue?: boolean): boolean {
        const rawValue = process.env[varName]?.toLowerCase(); // Normalize case

        if (rawValue === undefined) {
            if (defaultValue !== undefined) return defaultValue;
            throw new UndefinedValueError(varName);
        }

        if (['true', '1'].includes(rawValue)) return true;
        if (['false', '0'].includes(rawValue)) return false;

        throw new AppTypeError(`Environment variable ${varName} must be a boolean (true, false, 1, 0)`);
    }
}

const env: EnvConfig = Env.getInstance().config;
export default env;
