module.exports = app => {
    const controller = require("../controllers/post.controller.js")
    const router = require("express").Router();

    router.get('/', controller.findAll)
    router.post('/', controller.create)
    router.get("/ishot", controller.findIsHot)


    router.put("/:id", controller.update)
    router.get("/:id", controller.findOne)
    router.delete("/:id", controller.delete)
    router.delete("/", controller.deleteAll)

    app.use('/api/post', router);
}