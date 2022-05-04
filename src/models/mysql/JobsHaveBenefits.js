const { DataTypes } = require("sequelize/types");
const sequelize = require("./dbAssociations");

const Job = sequelize.define('Job', {name: DataTypes.STRING});
const Benefit = sequelize.define('Benefit', {name: DataTypes.STRING});

//NOT TESTED YET

const JobsHaveBenefits = sequelize.define('jobs-have-benefits', {
  JobId: {
    type: DataTypes.INTEGER,
    references: {
      model: Job,
      key: 'id'
    }
  },
  BenefitId: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id'
    }
  }
});
Job.belongsToMany(Benefit, {through: JobsHaveBenefits});
Benefit.belongsToMany(Job, {through: JobsHaveBenefits});