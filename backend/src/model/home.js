const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true,
        enum: ['#work', '#personal', '#urgent', '#other'],
        default: "#work"
    },
    priority: {
        type: String,
        required: true,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    },
    date: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model("Tasks", taskSchema)