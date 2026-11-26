const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
    {
        ticketType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TicketType',
            required: true,
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        purchasedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Ticket', ticketSchema);