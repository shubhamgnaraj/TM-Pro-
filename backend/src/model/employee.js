const mongoose = require("mongoose");
const taskSchema = require("./tasks");
const bcrypt = require("bcryptjs");
const messageSchema = require("./message");
const jwt = require("jsonwebtoken");

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
  totalTask: {
    type: Number,
    default: 0,
  },
  pendingTask: {
    type: Number,
    default: 0,
  },
  acceptedTask: {
    type: Number,
    default: 0,
  },
  tasks: [taskSchema],
  messages: [messageSchema],
});

employeeSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("Employee", employeeSchema);
