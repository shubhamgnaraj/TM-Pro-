const express = require("express");
const authRouter = express.Router();
const authController = require('../controller/authController');
const upload = require("../middleware/multer");

authRouter.post("/manager/add-user",upload.single("photo"), authController.registerUser)

authRouter.post("/employee/login", authController.loginUser)

module.exports = authRouter;
