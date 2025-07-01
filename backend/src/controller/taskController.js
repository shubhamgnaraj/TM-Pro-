const User = require("../model/user");

exports.addTask = async (req, res, next) => {
  const { userId, title, description, tags, priority, date } = req.body;
  try {
    const item = await User.findByIdAndUpdate(
      userId,
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
  const taskItems = await User.find();
  res.json(taskItems);
};
