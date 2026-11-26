const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    try {
        if (!req.body.organizers || req.body.organizers.length === 0) {
            return res.status(400).json({ message: 'Un événement doit avoir au moins un organisateur.' });
        }

        const newEvent = new Event(req.body);
        await newEvent.save();

        res.status(201).json({ message: 'Événement créé avec succès !', event: newEvent });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Erreur lors de la création de l\'événement :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate('organizers', 'username email')
            .populate('participants', 'username email');
        res.status(200).json(events);
    } catch (error) {
        console.error('Erreur lors de la récupération des événements :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('organizers', 'username email')
            .populate('participants', 'username email');

        if (!event) {
            return res.status(404).json({ message: 'Événement non trouvé.' });
        }

        res.status(200).json(event);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'événement :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: 'Événement non trouvé.' });
        }

        res.status(200).json({ message: 'Événement mis à jour avec succès !', event: updatedEvent });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Erreur lors de la mise à jour de l\'événement :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Événement non trouvé.' });
        }
        res.status(200).json({ message: 'Événement supprimé avec succès !' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'événement :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};