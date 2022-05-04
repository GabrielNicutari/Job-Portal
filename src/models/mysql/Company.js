const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        "companies",
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
            logo: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            number_of_employees: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            website_url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false
        }
    );
}
