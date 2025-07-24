const express = require("express");
const taskRouter = express.Router();
const { body } = require("express-validator");

const taskController = require("../controller/taskController");

taskRouter.post("/manager/send-task-employee", taskController.addTask);
taskRouter.get("/task/home", taskController.getTasks);

taskRouter.get(
  "/employee/dashboard/:employeeId",
  taskController.getEmployeeTask
);

taskRouter.get("/manager/dashboard", taskController.getAllUsers);

taskRouter.get("/messages/:chatId", taskController.getSpecificAllMsg);

taskRouter.delete(
  "/view-details/:employeeId/task/:taskId",
  taskController.deleteTaskFromEmployees
);

taskRouter.put(
  "/manager/sendTask/:mode/:empId/:taskId",
  taskController.putUpdatedTask
);

taskRouter.put(
  "/employee/tasks/:employeeId",
  taskController.putAcceptedTask
)

module.exports = taskRouter;
