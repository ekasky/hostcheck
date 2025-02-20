import { Sequelize } from 'sequelize';
import ENV from './env';

const sequelize: Sequelize = new Sequelize(ENV.MYSQL.MYSQL_DATABASE, ENV.MYSQL.MYSQL_USER, ENV.MYSQL.MYSQL_PASSWORD, {

    host: ENV.MYSQL.MYSQL_HOST,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

});

export default sequelize;