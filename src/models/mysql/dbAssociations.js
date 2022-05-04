dbConfig = require('../../database/config');
const {Sequelize, DataTypes} = require('sequelize');
require('dotenv').config();
const isDevelopment = process.env.NODE_ENV === 'development';
let config;
config = isDevelopment ? dbConfig.development : dbConfig.production;
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });

const User = require('./User')(sequelize);
const Role = require('./Role')(sequelize);
const Company = require('./Company')(sequelize);
const Job = require('./Job')(sequelize);
const JobStatus = require('./JobStatus')(sequelize);
const JobType = require('./JobType')(sequelize);

// create associations
User.hasOne(Role, {
    foreignKey: {
        name: 'role_id',
        type: DataTypes.INTEGER
    }
});
Role.belongsTo(User);

User.hasOne(Company, {
    foreignKey: {
        name: 'user_id',
        type: DataTypes.INTEGER
    }
});
Company.belongsTo(User);

Job.hasOne(Company, {
    foreignKey: {
        name: 'company_id',
        type: DataTypes.INTEGER
    }
});
Company.belongsTo(Job);

Job.hasOne(JobStatus, {
    foreignKey: {
        name: 'job_status_id',
        type: DataTypes.INTEGER
    }
});
JobStatus.belongsTo(Job);

Job.hasOne(JobType, {
    foreignKey: {
        name: 'job_type_id',
        type: DataTypes.INTEGER
    }
});
JobType.belongsTo(Job);

module.exports = sequelize;


