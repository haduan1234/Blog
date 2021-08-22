module.exports = app => {
    const controller = require("../controllers/permission.controller.js");
  
    const router = require("express").Router();
  
    router.post("/", controller.create);
  
    router.get("/", controller.findAll);

    router.get("/getAllUserByReceiverId", controller.getAllUserByReceiverId);
    //api/teachers/3
    router.get("/:id", controller.findOne);
  
    router.put("/:id", controller.update);
  
    router.delete("/deleteBySharerId", controller.deleteBySharerId)
    // router.delete("/:id", controller.delete);
  
    // router.delete("/", controller.deleteAll);
  
    app.use("/api/permission", router);
  };
  