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

const Application = require('./Application')(sequelize);
const Benefit = require('./Benefit')(sequelize);
const Category = require('Category')(sequelize);
const CategoriesHaveJobs = require('./CategoriesHaveJob')(sequelize);
const Company = require('./Company')(sequelize);
const JobStatus = require('./JobStatus')(sequelize);
const JobType = require('./JobType')(sequelize);
const Job = require('./Job')(sequelize);
const JobsHaveBenefits = require('./JobsHaveBenefits')(sequelize);
const Role = require('./Role')(sequelize);
const User = require('./User')(sequelize);

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

Application.hasOne(Job, {
    foreignKey: {
        name: 'job_id',
        type: DataTypes.INTEGER
    }
});

// get all users for testing...
const getApplications = require('./fetchData');
// getUsers(User).then(r => console.log('success', r)).catch((err) => console.log(err));
getApplications(Application).then(r => console.log('success', r)).catch((err) => console.log(err));

module.exports = sequelize;


