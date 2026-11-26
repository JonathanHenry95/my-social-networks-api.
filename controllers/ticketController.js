const Ticket = require('../models/Ticket');
const TicketType = require('../models/TicketType');

exports.createTicket = async (req, res) => {
    try {
        const ticketType = await TicketType.findById(req.body.ticketType);
        if (!ticketType) {
            return res.status(404).json({ message: 'Type de billet non trouvé.' });
        }

        const soldCount = await Ticket.countDocuments({ ticketType: ticketType._id });
        if (soldCount >= ticketType.quantity) {
            return res.status(400).json({ message: 'Plus de billets disponibles pour cette catégorie.' });
        }

        const newTicket = new Ticket(req.body);
        await newTicket.save();
        res.status(201).json({ message: 'Billet acheté avec succès !', ticket: newTicket });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Erreur lors de l\'achat du billet :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.getAllTickets = async (req, res) => {
    try {
        const filter = req.query.ticketType ? { ticketType: req.query.ticketType } : {};
        const tickets = await Ticket.find(filter).populate('ticketType', 'name price event');
        res.status(200).json(tickets);
    } catch (error) {
        console.error('Erreur lors de la récupération des billets :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id).populate('ticketType', 'name price event');
        if (!ticket) {
            return res.status(404).json({ message: 'Billet non trouvé.' });
        }
        res.status(200).json(ticket);
    } catch (error) {
        console.error('Erreur lors de la récupération du billet :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.deleteTicket = async (req, res) => {
    try {
        const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
        if (!deletedTicket) {
            return res.status(404).json({ message: 'Billet non trouvé.' });
        }
        res.status(200).json({ message: 'Billet annulé avec succès !' });
    } catch (error) {
        console.error('Erreur lors de la suppression du billet :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};