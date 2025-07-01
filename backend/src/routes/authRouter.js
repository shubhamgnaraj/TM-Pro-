const express = require("express");
const authRouter = express.Router();
const authController = require('../controller/authController')

authRouter.post("/sign-up", authController.registerUser)

authRouter.post("/login", authController.loginUser)
module.exports = authRouter;