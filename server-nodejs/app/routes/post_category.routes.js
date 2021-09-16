module.exports = app => {
    const router = require("express").Router();

    const controller = require("../controllers/post_category.controller")

    router.get("/", controller.findAll)
    router.post("/", controller.create)

    router.get("/:id", controller.findOne)
    router.put("/:id", controller.update)
    router.delete("/:id", controller.delete)

    app.use("/api/post_category", router);
};