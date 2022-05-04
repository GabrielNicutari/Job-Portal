const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        "jobs",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            date_created: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            has_salary: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            timestamps: false
        }
    );
}
