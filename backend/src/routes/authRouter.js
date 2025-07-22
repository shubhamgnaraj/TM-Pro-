const express = require("express");
const authRouter = express.Router();
const authController = require('../controller/authController');
const upload = require("../middleware/multer");

const {body} = require("express-validator")

authRouter.post("/manager/add-user",upload.single("photo"), authController.registerUser)

authRouter.post("/employee/login",
    body("email").isEmail().withMessage("Email must be valid email address"),
    body("password").isLength({min: 5}).withMessage("password must be a least 5 characters long"),
     authController.loginUser)

module.exports = authRouter;
