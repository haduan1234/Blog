const { post } = require(".")

module.exports = (sequelize, Sequelize, DataTypes) => {
    const Post = sequelize.define(
      "posts", // Model name
      {
          id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
          },
          name: {
              type: DataTypes.STRING,
              unique: true
          },
          avatar: {
            type: DataTypes.STRING
          },
          isHot: {
            type : DataTypes.BOOLEAN  
          },
          content: {
              type: DataTypes.TEXT
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
    return Post;
}