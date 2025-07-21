const { default: mongoose } = require("mongoose");
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

    const employee = await Employee.findById(employeeId);

    res.json({ tasks: employee ? employee : [] });
  } catch (error) {
    res.status(500).json({
      message: "failed to fetch employees tasks=> getEmployeeTask: ",
      error,
    });
  }
};

exports.getSpecificAllMsg = async (req, res, next) => {
  try {
    const { chatId } = req.params;

    // Await for data
    const employees = await Employee.find({
      "messages.chatId": chatId,
    });

    let allMessages = [];

    employees.forEach((employee) => {
      // fix here too: employee.messages.filter
      const msgs = employee.messages.filter((msg) => msg.chatId === chatId);
      allMessages = allMessages.concat(msgs);
    });

    // Sort by timestamp
    allMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    // Send response
    res.json(allMessages);
  } catch (error) {
    console.log("Something went wrong about Messages: ", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

exports.deleteTaskFromEmployees = async (req, res, next) => {
  try {
    const {employeeId, taskId} = req.params;

    const result = await Employee.updateOne(
      {_id: employeeId},
      {$pull: {tasks: {_id: new mongoose.Types.ObjectId(taskId)}}}
    )

    if(result.matchedCount === 0) {
      return res.status(404).json({message: "Task not found or Already Deleted"})
    }
    
    res.status(200).json({message: 'Task Deleted Succefuly'})
  } catch (error) {
   res.status(500).json({ error: "Internal server error." });
  }
}
