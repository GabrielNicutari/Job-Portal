require('dotenv').config();
const mysql = require('mysql');
const fs = require('fs');

let pool;

/**
 * generates pool connection to be used throughout the app
 */
const init = () => {
    try {
        pool = mysql.createPool({
            connectionLimit: process.env.MYSQL_CONNECTION_LIMIT
                ? parseInt(process.env.MYSQL_CONNECTION_LIMIT)
                : 4,
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            ssl: {
                ca : fs.readFileSync('./DigiCertGlobalRootCA.crt.pem')
            }
        });
        //console.debug('MySql Adapter Pool generated successfully');
    } catch (error) {
        console.error("[mysql.connector][init][Error]: ", error);
        throw new Error("failed to initialized pool");
    }
};

/**
 * executes SQL queries in MySQL db
 *
 * @param {string} query - provide a valid SQL query
 * @param {string[] | object} params - provide the parameterized values used
 * in the query
 */
const execute = (query, params) => {
        try {
            if (!pool)
                throw new Error(
                    "Pool was not created. Ensure pool is created when running the app."
                );

            return new Promise((resolve, reject) => {
                pool.query(query, params, (error, results) => {
                    pool.end();
                    if (error) reject(error);
                    else resolve(results);
                });
            });
        } catch (error) {
            console.error("[mysql.connector][execute][Error]: ", error);
            throw new Error("failed to execute MySQL query");
        }
    }
;

const end = () => {
    pool.end(function (err) {
        if (err) {
            return console.log("error:" + err.message);
        }
    });
}

module.exports = { init, execute, end };
