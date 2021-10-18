module.exports = app => {
    const router = require("express").Router()
    const controller = require("../controllers/post_like.controller.js")

    router.get("/", controller.findAll)
    router.post("/", controller.create)
    router.delete("/:userId", controller.delete)

    app.use("/api/post_like", router)
}