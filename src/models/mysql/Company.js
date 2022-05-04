const {DataTypes} = require('sequelize');

const Company = (sequelize, User) => {
    return sequelize.define(
        'companies',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            city: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            logo: {
                type: DataTypes.BLOB,
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
            user_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: User,
                    key: 'id'
                }
            },
            website_url: {
                type: DataTypes.STRING(2000),
                allowNull: false,
            },
        },
        {
            // options
        }
    );
}

module.exports = Company;
