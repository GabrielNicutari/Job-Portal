const { DataTypes } = require("sequelize/types");
const sequelize = require("./dbAssociations");

const Category = sequelize.define('Category', {name: DataTypes.STRING});
const Job = sequelize.define('Job', {name: DataTypes.STRING});

//NOT TESTED YET

const CategoriesHaveJobs = sequelize.define('categories-have-jobs', {
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
Category.belongsToMany(Job, {through: CategoriesHaveJobs});
Job.belongsToMany(Category, {through: CategoriesHaveJobs});