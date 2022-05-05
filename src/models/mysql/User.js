const { DataTypes } = require('sequelize');

const User = (sequelize) => {
    return sequelize.define(
        'users',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true,
            },
            username: {
                type: DataTypes.STRING(50),
                allowNull: false,
            }
        },
        {
            // options
        }
    );
}
module.exports = User;
