const { DataTypes } = require('sequelize');

const JobsHaveBenefits = (sequelize, Job, Benefit) => {
  return sequelize.define('jobs-have-benefits', {
    job_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Job,
        key: 'id',
      }
    },
    benefit_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Benefit,
        key: 'id'
      }
    }
  });
};
module.exports = JobsHaveBenefits;