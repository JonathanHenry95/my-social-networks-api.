const Poll = require('../models/Poll');

exports.createPoll = async (req, res) => {
    try {
        const newPoll = new Poll(req.body);
        await newPoll.save();
        res.status(201).json({ message: 'Sondage créé avec succès !', poll: newPoll });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Erreur lors de la création du sondage :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.getAllPolls = async (req, res) => {
    try {
        const filter = req.query.event ? { event: req.query.event } : {};
        const polls = await Poll.find(filter)
            .populate('event', 'name')
            .populate('createdBy', 'username email')
            .populate('questions.options.votes', 'username email');
        res.status(200).json(polls);
    } catch (error) {
        console.error('Erreur lors de la récupération des sondages :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.getPollById = async (req, res) => {
    try {
        const poll = await Poll.findById(req.params.id)
            .populate('event', 'name')
            .populate('createdBy', 'username email')
            .populate('questions.options.votes', 'username email');

        if (!poll) {
            return res.status(404).json({ message: 'Sondage non trouvé.' });
        }
        res.status(200).json(poll);
    } catch (error) {
        console.error('Erreur lors de la récupération du sondage :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.updatePoll = async (req, res) => {
    try {
        const updatedPoll = await Poll.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedPoll) {
            return res.status(404).json({ message: 'Sondage non trouvé.' });
        }
        res.status(200).json({ message: 'Sondage mis à jour avec succès !', poll: updatedPoll });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Erreur lors de la mise à jour du sondage :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.deletePoll = async (req, res) => {
    try {
        const deletedPoll = await Poll.findByIdAndDelete(req.params.id);
        if (!deletedPoll) {
            return res.status(404).json({ message: 'Sondage non trouvé.' });
        }
        res.status(200).json({ message: 'Sondage supprimé avec succès !' });
    } catch (error) {
        console.error('Erreur lors de la suppression du sondage :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

// Voter pour une option sur une question du sondage
exports.votePoll = async (req, res) => {
    try {
        const { userId, questionId, optionId } = req.body;
        const poll = await Poll.findById(req.params.id);

        if (!poll) {
            return res.status(404).json({ message: 'Sondage non trouvé.' });
        }

        const question = poll.questions.id(questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question non trouvée dans ce sondage.' });
        }

        const option = question.options.id(optionId);
        if (!option) {
            return res.status(404).json({ message: 'Option non trouvée pour cette question.' });
        }

        // Retire un éventuel vote précédent du même utilisateur sur cette question
        question.options.forEach((opt) => {
            opt.votes = opt.votes.filter((id) => id.toString() !== userId);
        });

        // Ajoute le nouveau vote
        option.votes.push(userId);
        await poll.save();

        res.status(200).json({ message: 'Vote enregistré avec succès !', poll });
    } catch (error) {
        console.error('Erreur lors du vote :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};