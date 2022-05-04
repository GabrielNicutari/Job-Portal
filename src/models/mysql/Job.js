const {DataTypes} = require('sequelize');

const Job = (sequelize, Company, JobStatus, JobType) => {
    return sequelize.define(
        'jobs',
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
            company_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: Company,
                    key: 'id'
                }
            },
            date_created: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            has_salary: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            job_status_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: JobStatus,
                    key: 'id'
                }
            },
            job_type_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: JobType,
                    key: 'id'
                }
            }
        },
        {
            // options
        }
    );
}

module.exports = Job;
