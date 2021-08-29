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
              unique: true
          },
          birthDay: {
              type: DataTypes.BIGINT,
              unique: true
          },
          addess: {
              type: DataTypes.STRING,
              unique: true
          },
          gender: {
              type: DataTypes.STRING,
              unique:  true
          },
          position: {
              type: DataTypes.STRING,
              unique: true
          },
          avata: {
              type: DataTypes.STRING
          },
          age: {
              type: DataTypes.INTEGER
          }


      })
      return Blogger;
    }