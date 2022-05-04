const {DataTypes} = require('sequelize');

const Role = (sequelize) => {
    return sequelize.define(
        'roles',
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
            // options
        }
    );
}

module.exports = Role;
