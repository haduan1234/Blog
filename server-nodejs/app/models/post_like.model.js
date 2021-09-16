module.exports = (sequelize, Sequelize, DataTypes) => {
  const Post_like = sequelize.define(
    "post_likes", // Model name
    {
      id:
      {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
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
  return Post_like
}