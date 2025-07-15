const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
const {Server} = require("socket.io")
const Employee = require("./src/model/employee")

const PORT = process.env.PORT || 3000;
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log("Socket connected: ", socket.id)

    socket.on("joinRoom", (chatId) => {
        socket.join(chatId)
        console.log("User joined room: ", chatId)
});

socket.on("sendMessage", async({chatId, senderId, receiverId, content}) => {
    const newMessage = {
        chatId,
        senderId,
        receiverId,
        content,
        timestamp: new Date()
    }

    await Employee.findByIdAndUpdate(senderId, {
        $push: {messages: newMessage}
    })
    await Employee.findByIdAndUpdate(receiverId, {
        $push: {messages: newMessage}
    })

    io.to(chatId).emit("receiveMessage", newMessage)
})

socket.on("disconnect", () => {
    console.log("socket disconnected", socket.id)
})
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(PORT, () => {
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