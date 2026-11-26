const Group = require('../models/Group');

exports.createGroup = async (req, res) => {
    try {
        if (!req.body.admins || req.body.admins.length === 0) {
            return res.status(400).json({ message: 'Un groupe doit avoir au moins un administrateur.' });
        }

        const newGroup = new Group(req.body);
        await newGroup.save();

        res.status(201).json({ message: 'Groupe créé avec succès !', group: newGroup });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Erreur lors de la création du groupe :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find()
            .populate('admins', 'username email')
            .populate('members', 'username email');
        res.status(200).json(groups);
    } catch (error) {
        console.error('Erreur lors de la récupération des groupes :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.getGroupById = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id)
            .populate('admins', 'username email')
            .populate('members', 'username email');

        if (!group) {
            return res.status(404).json({ message: 'Groupe non trouvé.' });
        }

        res.status(200).json(group);
    } catch (error) {
        console.error('Erreur lors de la récupération du groupe :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.updateGroup = async (req, res) => {
    try {
        const updatedGroup = await Group.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedGroup) {
            return res.status(404).json({ message: 'Groupe non trouvé.' });
        }

        res.status(200).json({ message: 'Groupe mis à jour avec succès !', group: updatedGroup });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Erreur lors de la mise à jour du groupe :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.deleteGroup = async (req, res) => {
    try {
        const deletedGroup = await Group.findByIdAndDelete(req.params.id);
        if (!deletedGroup) {
            return res.status(404).json({ message: 'Groupe non trouvé.' });
        }
        res.status(200).json({ message: 'Groupe supprimé avec succès !' });
    } catch (error) {
        console.error('Erreur lors de la suppression du groupe :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};