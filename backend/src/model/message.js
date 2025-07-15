const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
    chatId: {
        type: String,
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

module.exports = messageSchema;