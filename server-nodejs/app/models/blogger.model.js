module.exports = (sequelize, Sequelize, DataTypes) => {
    const Blogger = sequelize.define(
      "bloggers", // Model name
      {
          id: {
              type: DataTypes.UUID,
              defaultValue: Sequelize.UUIDV4,
              primaryKey: true
          },
          name: {
              type: DataTypes.STRING,
          },
          birthDay: {
              type: DataTypes.BIGINT,
          },
          address: {
              type: DataTypes.STRING,
          },
          gender: {
              type: DataTypes.STRING,
          },
          position: {
              type: DataTypes.STRING,
          },
          avatar: {
              type: DataTypes.STRING
          },
          age: {
              type: DataTypes.INTEGER
          }


      })
      return Blogger;
    }