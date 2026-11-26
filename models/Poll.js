const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    optionText: {
        type: String,
        required: true,
        trim: true,
    },
    votes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
});

const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true,
        trim: true,
    },
    options: {
        type: [optionSchema],
        validate: {
            validator: (v) => Array.isArray(v) && v.length >= 2,
            message: 'Une question doit contenir au moins deux choix de réponse.',
        },
    },
});

const pollSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        questions: {
            type: [questionSchema],
            validate: {
                validator: (v) => Array.isArray(v) && v.length >= 1,
                message: 'Un sondage doit contenir au moins une question.',
            },
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Poll', pollSchema);