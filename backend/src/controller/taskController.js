const Employee = require("../model/employee");

exports.addTask = async (req, res, next) => {
  const { employeeId, title, description, tags, priority, date } = req.body;

  console.log(employeeId);
  try {
    const item = await Employee.findByIdAndUpdate(
      employeeId,

      { $push: { tasks: { title, description, tags, priority, date } } },
      { new: true }
    );
    res.json(item);
  } catch (error) {
    console.log("task not save: ", error);
    res.status(500).json({ error: "Task not saved" });
  }
};

exports.getTasks = async (req, res, next) => {
  const taskItems = await Employee.find();
  res.json(taskItems);
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const employee = await Employee.find();
    res.json({ user: employee });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Employee" });
  }
};

exports.getEmployeeTask = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const employee = await employee.findById(employeeId);

    res.json({ tasks: employee ? employee : [] });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "failed to fetch employees tasks=> getEmployeeTask: ",
        error,
      });
  }
};
