const mongoose = require("mongoose");
const taskSchema = require("./tasks");
const bcrypt = require("bcryptjs");

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
  tasks: [taskSchema],
});

employeeSchemaSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});
module.exports = mongoose.model("Employee", employeeSchema);
