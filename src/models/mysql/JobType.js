const {DataTypes} = require('sequelize');

const JobType = (sequelize) => {
    return sequelize.define(
        "job_types",
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
            },
        },
        {
            timestamps: false
        }
    );
}

module.exports = JobType;
