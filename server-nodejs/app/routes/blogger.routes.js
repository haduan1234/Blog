module.exports = app => {
    const controller = require("../controllers/blogger.controller")
    const router = require("express").Router();

    router.get("/", controller.findAll)
    router.post("/", controller.create)


    router.get("/:id", controller.findOne)
    router.put("/:id", controller.update)
    router.delete("/:id", controller.deleteOne)
    router.delete("/", controller.deleteAll)

    app.use("/api/blogger", router)
}