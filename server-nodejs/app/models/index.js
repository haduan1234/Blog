const config = require("../config/config.js")
const { Sequelize, DataTypes, Op } = require("sequelize")

const sequelize = new Sequelize(
  config.db.DB_NAME,
  config.db.DB_USER,
  config.db.DB_PASS,
  {
    host: config.db.DB_HOST,
    dialect: config.db.dialect,
    operatorsAliases: false,

    poll: {
      max: config.db.pool.max,
      min: config.db.pool.min,
      acquire: config.db.pool.acquire,
      idle: config.db.pool.idle
    }
  }
)

const db = {}

db.Sequelize = Sequelize
db.Op = Op
db.sequelize = sequelize

db.user = require("./user.model.js")(sequelize, Sequelize, DataTypes)
db.role = require("./role.model.js")(sequelize, Sequelize, DataTypes)
db.permission = require("./permission.model.js")(sequelize, Sequelize, DataTypes)
db.scheduler = require("./scheduler.model.js")(sequelize, Sequelize, DataTypes)
db.recipients_schedule = require("./recipients_schedule.model.js")(sequelize, Sequelize, DataTypes)
db.label = require("./label.model.js")(sequelize, Sequelize, DataTypes)

db.post = require("./post.model.js")(sequelize, Sequelize, DataTypes)

// reference scheduler with label
db.label.hasMany(db.scheduler)
db.scheduler.belongsTo(db.label)
db.user.hasMany(db.label)
db.label.belongsTo(db.user)

//reference peremission and role
db.user.hasMany(db.permission)
db.permission.belongsTo(db.user)

//reference scheduler with recipients, user with recipients
db.user.hasMany(db.recipients_schedule)
db.recipients_schedule.belongsTo(db.user)
db.scheduler.hasMany(db.recipients_schedule)
db.recipients_schedule.belongsTo(db.scheduler)

// reference scheduler with user
db.scheduler.belongsTo(db.user)
db.user.hasMany(db.scheduler)

// reference user and role
db.user.belongsTo(db.role)
db.role.hasMany(db.user)

// db.role.belongsToMany(db.user, {
//   through: "user_roles",
//   foreignKey: "role_id",
//   otherKey: "user_id"
// });
// db.user.belongsToMany(db.role, {
//   through: "user_roles",
//   foreignKey: "user_id",
//   otherKey: "role_id"
// });

db.ROLES = ["user", "admin"]
db.PERMISSIONS = ["read", "add", "edit", "delete", "no_permission"]

module.exports = db
