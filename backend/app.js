const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const helmet = require("helmet");
require("dotenv").config();
const multer = require("multer")
const path = require("path")

// External modules
const { errorController } = require("./src/controller/error");
const taskRouter = require("./src/routes/taskRouter");
const authRouter = require("./src/routes/authRouter");
const verifyToken = require("./src/middleware/verifyToken")
// const { collection } = require("./src/model/home");
const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "http://localhost:3000", "data:"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'src/uploads'), {
  setHeaders: (req, path, stat) => {
     req.set('Cross-Origin-Resource-Policy', 'cross-origin');
  }
}));

app.use(authRouter);

app.use(verifyToken, taskRouter);


app.use(errorController);
// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI)
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
