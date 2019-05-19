var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    creatorId: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    permissions: [Number],
    assigned: {
        limit: {
            type: Number,
            required: true
        },
        users: [String]
    },
    createdAt: { 
        type: Date,
        default: Date.now
    }
});

var Task = mongoose.model('Task', TaskSchema);
module.exports = Task;