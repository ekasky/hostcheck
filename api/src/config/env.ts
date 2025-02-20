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

export default {
    PORT, 
    NODE_ENV,
    MYSQL: {
        MYSQL_ROOT_PASSWORD,
        MYSQL_DATABASE,
        MYSQL_USER,
        MYSQL_PASSWORD,
        MYSQL_HOST
    }
};