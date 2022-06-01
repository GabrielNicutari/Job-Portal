dbConfig = require('../../database/MySQLconfig');
const {Sequelize} = require('sequelize');
const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
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

const Role = require('./Role')(sequelize);
const User = require('./User')(sequelize);
const Benefit = require('./Benefit')(sequelize);
const JobStatus = require('./JobStatus')(sequelize);
const JobType = require('./JobType')(sequelize);
const Category = require('./Category')(sequelize);
const Job = require('./Job')(sequelize);
const Application = require('./Application')(sequelize);
const Company = require('./Company')(sequelize);
const JobsHaveBenefits = require('./JobsHaveBenefits')(sequelize, Job, Benefit);
const CategoriesHaveJobs = require('./CategoriesHaveJobs')(sequelize, Category, Job);

// 1 : Many Role - User
Role.hasMany(User,{
    foreignKey: 'role_id'
});
User.belongsTo(Role,{
    foreignKey: 'role_id'
});

// 1 : One User - Company
User.hasMany(Company,{
    foreignKey: 'user_id'
});
Company.belongsTo(User,{
    foreignKey: 'user_id'
});

// Many : Many Jobs - Benefits
Job.belongsToMany(Benefit, { through: JobsHaveBenefits, foreignKey: 'job_id' });
Benefit.belongsToMany(Job, { through: JobsHaveBenefits, foreignKey: 'benefit_id' });

// Many : Many Categories - Jobs
Job.belongsToMany(Category, { through: CategoriesHaveJobs, foreignKey: 'job_id' });
Category.belongsToMany(Job, { through: CategoriesHaveJobs, foreignKey: 'category_id' });

// 1 : Many Job Status - Job
JobStatus.hasMany(Job,{
    foreignKey: 'job_status_id'
});
Job.belongsTo(JobStatus,{
    foreignKey: 'job_status_id'
});

// 1 : Many Job Type - Job
JobType.hasMany(Job,{
    foreignKey: 'job_type_id'
});
Job.belongsTo(JobType,{
    foreignKey: 'job_type_id'
});

// 1 : Many Job - Application
Job.hasMany(Application,{
    foreignKey: 'job_id'
});
Application.belongsTo(Job,{
    foreignKey: 'job_id'
});

// 1 : Many User - Application
User.hasMany(Application,{
    foreignKey: 'user_id'
});
Application.belongsTo(User,{
    foreignKey: 'user_id'
});

module.exports = sequelize;
