module.exports = (sequelize, Sequelize, DataTypes) => {
  const Post_category = sequelize.define(
    "post_categorys", // Model name
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        unique: true
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

  return Post_category
}