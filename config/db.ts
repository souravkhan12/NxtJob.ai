import mysql, { PoolOptions } from 'mysql2/promise';

const access: PoolOptions = {
    host: 'localhost',
    user: 'root',
    database: 'jobsposting_db',
    password: 'Sourav@12'
};

const mysqlPool = mysql.createPool(access);

module.exports = mysqlPool;