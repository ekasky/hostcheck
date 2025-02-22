import { Sequelize } from 'sequelize';
import ENV from './Env';

class Database {
    private static instance: Sequelize;

    private constructor() {} // Prevent direct instantiation

    public static getInstance(): Sequelize {
        if (!Database.instance) {
            Database.instance = new Sequelize(ENV.MYSQL_DATABASE, ENV.MYSQL_USER, ENV.MYSQL_PASSWORD, {
                host: ENV.MYSQL_HOST,
                dialect: 'mysql',
                pool: {
                    max: 10,
                    min: 0,
                    acquire: 30000,
                    idle: 10000,
                },
                logging: ENV.NODE_ENV === 'development' ? console.log : false, // Enable logging only in dev
            });
        }

        return Database.instance;
    }
}

const sequelize = Database.getInstance();
export default sequelize;
