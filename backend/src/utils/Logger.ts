import winston from 'winston';
import 'winston-daily-rotate-file';
import env from '../config/Env';

class Logger {
    private static instance: winston.Logger;

    private constructor() {} // Prevent direct instantiation

    public static getInstance(): winston.Logger {
        if (!Logger.instance) {
            Logger.instance = winston.createLogger({
                level: env.NODE_ENV === 'production' ? 'info' : 'debug',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.printf(({ timestamp, level, message }) => {
                        return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
                    }),
                ),
                transports: [
                    new winston.transports.Console({
                        format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
                    }),
                    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
                    new winston.transports.File({ filename: 'logs/combined.log' }),
                ],
            });
        }
        return Logger.instance;
    }
}

const logger = Logger.getInstance();
export default logger;
