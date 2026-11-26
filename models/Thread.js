const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group',
        },
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Validation métier : lié soit à un groupe, soit à un événement, mais jamais les deux
threadSchema.pre('validate', function () {
    if ((this.group && this.event) || (!this.group && !this.event)) {
        throw new Error('Un fil de discussion doit être lié soit à un groupe, soit à un événement (et pas aux deux).');
    }
});

module.exports = mongoose.model('Thread', threadSchema);