module.exports = app => {
    const controller = require("../controllers/recipients_schedule.controller.js")

    const router = require("express").Router()

    router.post("/", controller.create)

    router.get("/", controller.findAll)

    router.get("/getUserIdBySchedulerId", controller.getUserIdBySchedulerId)
    router.get("/getStatus", controller.getStatus)

    router.post("/updateStatus", controller.updateStatus)

    //api/teachers/3
    router.get("/:id", controller.findOne)

    router.put("/:id", controller.update)

    // router.delete("/:id", controller.delete);

    router.delete("/", controller.deleteAll)

    router.delete("/deleteBySchedulerIdAndUserId", controller.deleteBySchedulerIdAndUserId)

    app.use("/api/recipients_schedule", router)
}
