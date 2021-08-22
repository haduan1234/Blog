module.exports = (sequelize, Sequelize, DataTypes) => {
    const Permissison = sequelize.define(
      "Permissions", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        sharerId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        read: {
          type: DataTypes.BOOLEAN,
          defaultValue: true
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
  
    return Permissison;
  };
  