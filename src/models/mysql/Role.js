const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        "roles",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            name: {
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
