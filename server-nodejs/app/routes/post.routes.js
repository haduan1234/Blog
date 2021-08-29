module.exports = app => {
    const controller = require("../controllers/post.controller.js")
    const router = require("express").Router();

    router.get('/', controller.findAll)
    router.post('/', controller.create)

    app.use('/api/post', router);
}