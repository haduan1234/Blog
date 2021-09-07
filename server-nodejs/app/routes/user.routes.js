const { authJwt } = require("../middlewares")
const controller = require("../controllers/user.controller")
const router = require("express").Router()

module.exports = function (app) {

  app.get("/api/test/all", controller.allAccess)

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard)

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  )

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  )

  router.get("/", controller.findAll)

  router.get("/getAllExceptMy", controller.getAllExceptMy)

  router.get("/getAllFreeTimes", controller.getAllUserFreeTimes)

  router.get("/getAllUserShareScheduleForMe", controller.getAllUserShareScheduleForMe)

  router.post("/", controller.create)

  //api/teachers/3
  router.get("/:id", controller.findOne)

  router.post("/updatePassWord", controller.updatePassWord)
  router.post("/resetPassWord", controller.resetPassWord)

  router.put("/:id", controller.update)

  router.delete("/:id", controller.delete)

  router.delete("/", controller.deleteAll)

  app.use("/api/user", router)
}
