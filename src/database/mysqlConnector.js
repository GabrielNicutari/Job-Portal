/**
 * Import Sequelize.
 */
const Sequelize = require("sequelize");require('dotenv').config();

/**
 * Create a Sequelize instance. This can be done by passing
 * the connection parameters separately to the Sequelize constructor.
 */
const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USERNAME,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

/**
 * Export the Sequelize instance. This instance can now be
 * used in the app.js file to authenticate and establish a database connection.
 */
module.exports = sequelize;
