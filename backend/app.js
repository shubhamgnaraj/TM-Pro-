const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const helmet = require("helmet");
require("dotenv").config();

// Validate environment variables
if (!process.env.SESSION_SECRET_KEY || !process.env.MONGO_URI) {
  console.error(
    "Missing required environment variables. Please check your .env file."
  );
  process.exit(1);
}

// External modules
const { errorController } = require("./src/controller/error");
const taskRouter = require("./src/routes/taskRouter");
const authRouter = require("./src/routes/authRouter");
// const { collection } = require("./src/model/home");
const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/auth", authRouter);

app.use(taskRouter);

app.use(errorController);

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  });

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await mongoose.connection.close();
  process.exit(0);
});
