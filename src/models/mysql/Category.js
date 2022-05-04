const {DataTypes} = require('sequelize');

const Category = (sequelize) => {
    return sequelize.define(
        'categories',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            }
        },
        {
            // options
        }
    );
}

module.exports = Category;
