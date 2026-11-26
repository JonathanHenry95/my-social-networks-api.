const Thread = require('../models/Thread');

exports.createThread = async (req, res) => {
    try {
        const newThread = new Thread(req.body);
        await newThread.save();
        res.status(201).json({ message: 'Fil de discussion créé avec succès !', thread: newThread });
    } catch (error) {
        if (error.name === 'ValidationError' || error.message.includes('Un fil de discussion')) {
            return res.status(400).json({ message: error.message });
        }
        console.error('Erreur lors de la création du fil :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.getAllThreads = async (req, res) => {
    try {
        const filter = {};
        if (req.query.group) filter.group = req.query.group;
        if (req.query.event) filter.event = req.query.event;

        const threads = await Thread.find(filter)
            .populate('createdBy', 'username email')
            .populate('group', 'name')
            .populate('event', 'name');
        res.status(200).json(threads);
    } catch (error) {
        console.error('Erreur lors de la récupération des fils :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.getThreadById = async (req, res) => {
    try {
        const thread = await Thread.findById(req.params.id)
            .populate('createdBy', 'username email')
            .populate('group', 'name')
            .populate('event', 'name');

        if (!thread) {
            return res.status(404).json({ message: 'Fil de discussion non trouvé.' });
        }
        res.status(200).json(thread);
    } catch (error) {
        console.error('Erreur lors de la récupération du fil :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.updateThread = async (req, res) => {
    try {
        const updatedThread = await Thread.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedThread) {
            return res.status(404).json({ message: 'Fil de discussion non trouvé.' });
        }
        res.status(200).json({ message: 'Fil mis à jour avec succès !', thread: updatedThread });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Erreur lors de la mise à jour du fil :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.deleteThread = async (req, res) => {
    try {
        const deletedThread = await Thread.findByIdAndDelete(req.params.id);
        if (!deletedThread) {
            return res.status(404).json({ message: 'Fil de discussion non trouvé.' });
        }
        res.status(200).json({ message: 'Fil supprimé avec succès !' });
    } catch (error) {
        console.error('Erreur lors de la suppression du fil :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};