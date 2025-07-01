const express = require("express");
const taskRouter = express.Router();

const taskController = require("../controller/taskController")

taskRouter.post("/task/add-task", taskController.addTask)
taskRouter.get("/task/home", taskController.getTasks)

module.exports = taskRouter;