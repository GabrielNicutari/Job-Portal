const {DataTypes} = require('sequelize');

const Category = (sequelize) => {
    return sequelize.define(
        "categories",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            }
        },
        {
            timestamps: false
        }
    );
}

module.exports = Category;
