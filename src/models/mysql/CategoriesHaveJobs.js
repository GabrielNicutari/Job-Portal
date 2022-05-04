const { DataTypes } = require('sequelize');

const CategoriesHaveJobs = (sequelize, Category, Job) => {
  return sequelize.define('categories-have-jobs', {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Category,
        key: 'id'
      }
    },
    job_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Job,
        key: 'id'
      }
    }
  });
}
module.exports = CategoriesHaveJobs;
