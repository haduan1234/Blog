module.exports = app => {
    const controller = require("../controllers/label.controller")

    const router = require("express").Router()

    router.post("/", controller.create)

    router.get("/", controller.findAll)
    router.get("/getAllByUserId", controller.getAllByUserId)

    //api/teachers/3
    router.get("/:id", controller.findOne)

    router.put("/:id", controller.update)

    router.delete("/:id", controller.delete)

    router.delete("/", controller.deleteAll)

    app.use("/api/label", router)
}
