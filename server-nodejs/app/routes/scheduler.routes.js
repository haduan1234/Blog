module.exports = app => {
  const controller = require("../controllers/scheduler.controller.js")

  const router = require("express").Router()

  router.post("/createGroup", controller.createGroup)
  router.post("/createSingle", controller.createSingle)

  router.get("/", controller.findAll)

  router.get("/getByTypeAndUserId", controller.getAllByTypeAndUserId)

  router.get("/getAllIsGroup", controller.getAllIsGroup)

  router.get("/getAllSchedulerIdIsConfirm", controller.getAllSchedulerIdIsConfirm)

  //api/teachers/3
  router.get("/:id", controller.findOne)

  router.put("/updateSingle/:id", controller.updateSingle)
  router.put("/updateGroup/:id", controller.updateGroup)

  router.delete("/:id", controller.delete)

  router.delete("/", controller.deleteAll)

  app.use("/api/scheduler", router)
}
