const mongoose = require("mongoose");
const Tasks = require("./home")

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [Tasks]
});

module.exports = mongoose.model("User", userSchema);
