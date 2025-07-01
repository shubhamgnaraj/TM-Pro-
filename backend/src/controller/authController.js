const { validationResult, check } = require("express-validator");
const User = require("../model/user");
const bcrypt = require("bcryptjs")

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
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const { firstname, lastname, email, password } = req.body;

      const existingUser = await User.findOne({email});
      if(existingUser) {
        return res.status(400).json({message: "user already exists"})
      }

      const user = new User({
        firstname,
        lastname,
        email,
        password,
      });

      const savedUser = await user.save();

      res.status(201).json({
        message: "user created successfully",
        user: savedUser
      })
    } catch (error) {
        console.error("registration error: ", error)
        res.status(500).json({message: 'server error during registration'})
    }
  },
];

exports.loginUser = async (req, res, next) => {
    console.log(req.body)
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json({
            message: "Login successful",
        });

    } catch (error) {
        console.error("Login error: ", error);
        res.status(500).json({ message: "Server error during login" });
    }
};
