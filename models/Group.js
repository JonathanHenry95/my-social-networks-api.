const mongoose = require('mongoose');

// Définition du schéma pour les groupes
const groupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
        },
        coverPhoto: {
            type: String,
        },
        type: {
            type: String,
            enum: ['public', 'private', 'secret'],
            default: 'public',
        },
        admins: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
        ],
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        allowMembersToPost: {
            type: Boolean,
            default: true,
        },
        allowMembersToCreateEvents: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;