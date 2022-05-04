dbConfig = require('../../database/config');
const {Sequelize} = require('sequelize');
require('dotenv').config();
const isDevelopment = process.env.NODE_ENV === 'development';
const config = isDevelopment ? dbConfig.development : dbConfig.production;
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
        define: {
            timestamps: false,
        },
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });

const Category = require('./Category')(sequelize);
const Role = require('./Role')(sequelize);
const Benefit = require('./Benefit')(sequelize);
const Company = require('./Company')(sequelize);
const JobStatus = require('./JobStatus')(sequelize);
const JobType = require('./JobType')(sequelize);
const User = require('./User')(sequelize, Role);
const Job = require('./Job')(sequelize, Company, JobStatus, JobType);
require('./Application')(sequelize, Job, User);
require('./JobsHaveBenefits')(sequelize, Job, Benefit);
require('./CategoriesHaveJobs')(sequelize, Category, Job);

module.exports = sequelize;
