const {DataTypes} = require('sequelize');

const JobStatus = (sequelize) => {
    return sequelize.define(
        'job-statuses',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            // options
        }
    );
}

module.exports = JobStatus;
