const { DataTypes } = require("sequelize");

const CategoriesHaveJobs = (sequelize) => {
  const Category = sequelize.define('Category', {name: DataTypes.STRING});
  const Job = sequelize.define('Job', {name: DataTypes.STRING});

  return sequelize.define('categories-have-jobs', {
    CategoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: 'id'
      }
    },
    JobId: {
      type: DataTypes.INTEGER,
      references: {
        model: Job,
        key: 'id'
      }
    }
  });
} 

module.exports = CategoriesHaveJobs;