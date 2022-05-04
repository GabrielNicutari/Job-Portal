const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        "users",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            role_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        },
        {
            timestamps: false
        }
    );
}
