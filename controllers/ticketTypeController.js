const TicketType = require('../models/TicketType');

exports.createTicketType = async (req, res) => {
    try {
        const newTicketType = new TicketType(req.body);
        await newTicketType.save();
        res.status(201).json({ message: 'Type de billet créé avec succès !', ticketType: newTicketType });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Erreur lors de la création du type de billet :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.getAllTicketTypes = async (req, res) => {
    try {
        const filter = req.query.event ? { event: req.query.event } : {};
        const ticketTypes = await TicketType.find(filter)
            .populate('event', 'name visibility')
            .populate('createdBy', 'username email');
        res.status(200).json(ticketTypes);
    } catch (error) {
        console.error('Erreur lors de la récupération des types de billets :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.getTicketTypeById = async (req, res) => {
    try {
        const ticketType = await TicketType.findById(req.params.id)
            .populate('event', 'name visibility')
            .populate('createdBy', 'username email');
        if (!ticketType) {
            return res.status(404).json({ message: 'Type de billet non trouvé.' });
        }
        res.status(200).json(ticketType);
    } catch (error) {
        console.error('Erreur lors de la récupération du type de billet :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.updateTicketType = async (req, res) => {
    try {
        const updatedTicketType = await TicketType.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedTicketType) {
            return res.status(404).json({ message: 'Type de billet non trouvé.' });
        }
        res.status(200).json({ message: 'Type de billet mis à jour avec succès !', ticketType: updatedTicketType });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Erreur lors de la mise à jour du type de billet :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.deleteTicketType = async (req, res) => {
    try {
        const deletedTicketType = await TicketType.findByIdAndDelete(req.params.id);
        if (!deletedTicketType) {
            return res.status(404).json({ message: 'Type de billet non trouvé.' });
        }
        res.status(200).json({ message: 'Type de billet supprimé avec succès !' });
    } catch (error) {
        console.error('Erreur lors de la suppression du type de billet :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};