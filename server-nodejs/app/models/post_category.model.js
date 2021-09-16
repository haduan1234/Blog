module.exports = (sequelize, Sequelize, DataTypes) => {
  const Post_catepory = sequelize.define(
    "post_cateporys", // Model name
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

  return Post_catepory
}