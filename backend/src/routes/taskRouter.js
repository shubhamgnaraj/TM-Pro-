const express = require("express");
const taskRouter = express.Router();

const taskController = require("../controller/taskController")

taskRouter.post("/manager/send-task-employee", taskController.addTask)
taskRouter.get("/task/home", taskController.getTasks)

taskRouter.get("/employee/dashboard/:employeeId", taskController.getEmployeeTask)

taskRouter.get("/manager/dashboard", taskController.getAllUsers)


module.exports = taskRouter;