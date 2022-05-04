const { DataTypes } = require('sequelize');

const User = (sequelize, Role) => {
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
            },
            role_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: Role,
                    key: 'id'
                }
            }
        },
        {
            // options
        }
    );
}
module.exports = User;
