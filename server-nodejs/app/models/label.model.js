module.exports = (sequelize, Sequelize, DataTypes) => {
  const Label = sequelize.define(
    "labels", // Model name
    {
      // Attributes
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      label_name: {
        type: DataTypes.STRING,
      },
      label_color: {
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
  )
  return Label
}
