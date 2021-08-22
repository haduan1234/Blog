module.exports = (sequelize, Sequelize, DataTypes) => {
    const Scheduler = sequelize.define(
        "Schedulers", // Model name
        {
            // Attributes
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            schedule_name: {
                type: DataTypes.STRING
            },
            type: {
                type: DataTypes.STRING,// single, group
                defaultValue: "single"
            },
            date: {
                type: DataTypes.BIGINT
            },
            start_time: {
                type: DataTypes.BIGINT
            },
            end_time: {
                type: DataTypes.BIGINT
            },
            noti_time: { 
                type: DataTypes.BIGINT
            },
            notification: {
                type: DataTypes.BOOLEAN
            },
            discription: {
                type: DataTypes.STRING
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

    return Scheduler;
};
