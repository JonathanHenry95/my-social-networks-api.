const mongoose = require('mongoose');

const carpoolSchema = new mongoose.Schema(
    {
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
            required: true,
        },
        driver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        departureLocation: {
            type: String,
            required: true,
            trim: true,
        },
        departureTime: {
            type: Date,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        availableSeats: {
            type: Number,
            required: true,
            min: 1,
        },
        maxDetourMinutes: {
            type: Number,
            default: 0,
            min: 0,
        },
        passengers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Carpool', carpoolSchema);