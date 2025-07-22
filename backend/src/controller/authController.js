const { validationResult, check } = require("express-validator");
const Employee = require("../model/employee");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = [
  check("firstname")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters long")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("First name only contains alphabet"),

  check("lastname")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 3 })
    .withMessage("Last name must be at least 3 characters long")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("Last name only contains alphabet"),

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is not valid"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  check("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {

      const { firstname, lastname, email, password, position } = req.body;
      
      const photo = req.file?.filename;

      const existingEmployee = await Employee.findOne({ email });
      if (existingEmployee) {
        return res.status(400).json({ message: "Employee already exists" });
      }

      const employeeData = new Employee({
        firstname,
        lastname,
        photo,
        email,
        password,
        position
      });

      const savedEmployeeData = await employeeData.save();

      res.status(201).json({
        errors: errors.array(),
        message: "Employee created successfully",
        user: savedEmployeeData,
      });
    } catch (error) {
      console.error("registration error: ", error);
      res.status(500).json({ message: "server error during registration" });
    }
  },
];

exports.loginUser = async (req, res, next) => {

  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }
  try {

    const { email, password } = req.body;

    const employee = await Employee.findOne({ email });
    if (!employee) res.status(404).json({ message: "Employee not found" });

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) res.status(404).json({ message: "Invalid Password" });
    
    const token = jwt.sign({ id: employee._id, position: employee.position}, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    res.status(200).json({
      token,
      message: "Login successful",
      employee,
      tasks: employee.tasks,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error during login" });
  }
};
