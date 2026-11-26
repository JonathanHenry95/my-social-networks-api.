const Message = require('../models/Message');

exports.createMessage = async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        await newMessage.save();
        res.status(201).json({ message: 'Message envoyé avec succès !', data: newMessage });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Erreur lors de l\'envoi du message :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.getAllMessages = async (req, res) => {
    try {
        const filter = req.query.thread ? { thread: req.query.thread } : {};
        const messages = await Message.find(filter)
            .populate('author', 'username email')
            .populate('thread', 'title')
            .populate('parentMessage', 'content author');
        res.status(200).json(messages);
    } catch (error) {
        console.error('Erreur lors de la récupération des messages :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.getMessageById = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id)
            .populate('author', 'username email')
            .populate('thread', 'title')
            .populate('parentMessage', 'content author');

        if (!message) {
            return res.status(404).json({ message: 'Message non trouvé.' });
        }
        res.status(200).json(message);
    } catch (error) {
        console.error('Erreur lors de la récupération du message :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.updateMessage = async (req, res) => {
    try {
        const updatedMessage = await Message.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedMessage) {
            return res.status(404).json({ message: 'Message non trouvé.' });
        }
        res.status(200).json({ message: 'Message mis à jour avec succès !', data: updatedMessage });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Erreur lors de la mise à jour du message :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        const deletedMessage = await Message.findByIdAndDelete(req.params.id);
        if (!deletedMessage) {
            return res.status(404).json({ message: 'Message non trouvé.' });
        }
        res.status(200).json({ message: 'Message supprimé avec succès !' });
    } catch (error) {
        console.error('Erreur lors de la suppression du message :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};