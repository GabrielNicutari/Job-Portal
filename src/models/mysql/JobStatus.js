const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        "job_statuses",
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
            timestamps: false
        }
    );
}
