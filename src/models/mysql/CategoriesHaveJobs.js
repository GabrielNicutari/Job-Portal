const { DataTypes } = require('sequelize');

const CategoriesHaveJobs = (sequelize) => {
    // sequelize will automatically generate the composite key based on the foreign keys which are passed in the association
  return sequelize.define('categories-have-jobs', {},
  { timestamps: false });
}
module.exports = CategoriesHaveJobs;
