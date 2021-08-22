module.exports = (sequelize, Sequelize, DataTypes) => {
  const User = sequelize.define(
    "users", // Model name
    {
      // Attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      display_name: {
        type: DataTypes.STRING,
        unique: true
      },
      token_notification: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      birthday: {
        type: DataTypes.BIGINT
      },
      gender: {
        type: DataTypes.STRING
      },
      avatar: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
      password: {
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

  return User
}
