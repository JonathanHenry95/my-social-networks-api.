const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        thread: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thread',
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        parentMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Message', messageSchema);