const {DataTypes} = require('sequelize');

const Benefit = (sequelize) => {
    return sequelize.define(
        "benefits",
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
            },
            icon_url: {
              type: DataTypes.STRING(2000),
              allowNull: true
            }
        },
        {
            timestamps: false
        }
    );
}

module.exports = Benefit;
