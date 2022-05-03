const {DataTypes} = require('sequelize');

const Application = (sequelize) => {
    return sequelize.define(
        "applications",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING(1000),
                allowNull: false,
            },
            full_name: {
              type: DataTypes.STRING(1000),
              allowNull: false,
            },
            linkedin_url: {
              type: DataTypes.STRING(2000),
              allowNull: true,
            },
            phone_number: {
              type: DataTypes.STRING(20),
              allowNull: false,
            },
            resume: {
                type: DataTypes.BLOB,
                allowNull: true,
            },
        },
        {
            timestamps: false
        }
    );
}

module.exports = Application;
