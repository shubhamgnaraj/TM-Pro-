const mongoose = require("mongoose");
const taskSchema = require("./tasks");
const bcrypt = require("bcryptjs");
const messageSchema = require("./message");

const employeeSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },
  photo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
    enum: ["employee", "manager"],
  },
  tasks: [taskSchema],
  messages: [messageSchema]
});

employeeSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});
module.exports = mongoose.model("Employee", employeeSchema);
