module.exports = app => {
    const router = require("express").Router()
    const controller = require("../controllers/post_like.controller.js")

    // router.get("/", controller.findAll)
    // router.post("/", controller.create)

    app.use("/api/post_like", router)
}