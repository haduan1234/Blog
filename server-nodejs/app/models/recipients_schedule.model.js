module.exports = (sequelize, Sequelize, DataTypes) => {
    const RecipientSchedule = sequelize.define(
        "Recipients_schedules", // Model name
        {
            // Attributes
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            noti_time: { 
                type: DataTypes.BIGINT
            },
            notification: {
                type: DataTypes.BOOLEAN
            },
            note: {
                type: DataTypes.STRING
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: "confirm"
                //confirm, agree, refuse 
            }
        },
        {
            // Options
            timestamps: true,
            underscrored: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );

    return RecipientSchedule;
};
