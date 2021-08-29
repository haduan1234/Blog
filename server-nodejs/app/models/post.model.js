module.exports = (sequelize, Sequelize, DataTypes) => {
    const Post = sequelize.define(
      "posts", // Model name
      {
          post_id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
          },
          post_name: {
              type: DataTypes.STRING,
              unique: true
          },
          post_content: {
              type: DataTypes.STRING,
              unique: true
          },
          post_time: {
            type: DataTypes.BIGINT
          },
          post_updateTime: {
            type: DataTypes.BIGINT
          },
          post_deleteTime: {
            type: DataTypes.BIGINT
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
}