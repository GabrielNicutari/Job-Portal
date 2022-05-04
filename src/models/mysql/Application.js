const {DataTypes} = require('sequelize');

const Application = (sequelize, Job, User) => {
    return sequelize.define(
        'applications',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            job_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: Job,
                    key: 'id'
                }
            },
            resume: {
                type: DataTypes.BLOB,
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING(1000),
                allowNull: false,
            },
            full_name: {
                type: DataTypes.STRING(1000),
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: User,
                    key: 'id'
                }
            },
            linkedin_url: {
                type: DataTypes.STRING(2000),
                allowNull: true
            },
            phone_number: {
                type: DataTypes.STRING(20),
                allowNull: false,
            }
        },
        {
            // options
        }
    );
}

module.exports = Application;
