import 'dotenv/config';

/* Server */
export const PORT: number     = Number(process.env.PORT) || 3000;
export const NODE_ENV: string = process.env.NODE_ENV || 'development';

/* MySQL Database */
export const MYSQL_ROOT_PASSWORD: string = process.env.MYSQL_ROOT_PASSWORD || 'root';
export const MYSQL_DATABASE: string      = process.env.MYSQL_DATABASE || 'database';
export const MYSQL_USER: string          = process.env.MYSQL_USER || 'user';
export const MYSQL_PASSWORD: string      = process.env.MYSQL_PASSWORD || 'password';
export const MYSQL_HOST: string          = process.env.MYSQL_HOST || 'localhost';

/* AWS SES Credentials */
export const AWS_SES_REGION: string            = process.env.AWS_SES_REGION || 'us-east-1';
export const AWS_SES_ACCESS_KEY_ID: string     = process.env.AWS_SES_ACCESS_KEY_ID || 'your_aws_ses_access_key_id';
export const AWS_SES_SECRET_ACCESS_KEY: string = process.env.AWS_SES_SECRET_ACCESS_KEY || 'your_aws_ses_secret_access_key';
export const AWS_SES_SENDER_EMAIL: string      = process.env.AWS_SES_SENDER_EMAIL || 'example@domain.com';

/* Gmail (For Dev Testing Only) */
export const GMAIL_USER: string = process.env.GMAIL_USER || 'example@gmail.com';
export const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || 'your-app-password';

export default {
    PORT, 
    NODE_ENV,
    MYSQL: {
        MYSQL_ROOT_PASSWORD,
        MYSQL_DATABASE,
        MYSQL_USER,
        MYSQL_PASSWORD,
        MYSQL_HOST
    },
    AWS_SES: {
        AWS_SES_REGION,
        AWS_SES_ACCESS_KEY_ID,
        AWS_SES_SECRET_ACCESS_KEY,
        AWS_SES_SENDER_EMAIL
    },
    GMAIL: {
        GMAIL_USER,
        GMAIL_APP_PASSWORD
    }
};