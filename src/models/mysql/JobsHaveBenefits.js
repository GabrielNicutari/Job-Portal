const { DataTypes } = require("sequelize");

const JobsHaveBenefits = (sequelize) => {
  const Job = sequelize.define('Job', {name: DataTypes.STRING});
  const Benefit = sequelize.define('Benefit', {name: DataTypes.STRING});

  return sequelize.define('jobs-have-benefits', {
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
        model: Benefit,
        key: 'id'
      }
    }
  });
} 

module.exports = JobsHaveBenefits;