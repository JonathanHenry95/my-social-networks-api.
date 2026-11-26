const Carpool = require('../models/Carpool');
const Event = require('../models/Event');

exports.createCarpool = async (req, res) => {
    try {
        const event = await Event.findById(req.body.event);
        if (!event) {
            return res.status(404).json({ message: 'Événement non trouvé.' });
        }
        if (!event.hasCarpooling) {
            return res.status(400).json({ message: 'Le covoiturage n\'est pas activé pour cet événement.' });
        }

        const newCarpool = new Carpool(req.body);
        await newCarpool.save();
        res.status(201).json({ message: 'Trajet de covoiturage créé avec succès !', carpool: newCarpool });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Erreur lors de la création du covoiturage :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.getAllCarpools = async (req, res) => {
    try {
        const filter = req.query.event ? { event: req.query.event } : {};
        const carpools = await Carpool.find(filter)
            .populate('event', 'name')
            .populate('driver', 'username email')
            .populate('passengers', 'username email');
        res.status(200).json(carpools);
    } catch (error) {
        console.error('Erreur lors de la récupération des covoiturages :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.getCarpoolById = async (req, res) => {
    try {
        const carpool = await Carpool.findById(req.params.id)
            .populate('event', 'name')
            .populate('driver', 'username email')
            .populate('passengers', 'username email');
        if (!carpool) {
            return res.status(404).json({ message: 'Trajet non trouvé.' });
        }
        res.status(200).json(carpool);
    } catch (error) {
        console.error('Erreur lors de la récupération du trajet :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.updateCarpool = async (req, res) => {
    try {
        const updatedCarpool = await Carpool.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedCarpool) {
            return res.status(404).json({ message: 'Trajet non trouvé.' });
        }
        res.status(200).json({ message: 'Trajet mis à jour avec succès !', carpool: updatedCarpool });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Erreur lors de la mise à jour du trajet :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.deleteCarpool = async (req, res) => {
    try {
        const deletedCarpool = await Carpool.findByIdAndDelete(req.params.id);
        if (!deletedCarpool) {
            return res.status(404).json({ message: 'Trajet non trouvé.' });
        }
        res.status(200).json({ message: 'Trajet supprimé avec succès !' });
    } catch (error) {
        console.error('Erreur lors de la suppression du trajet :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

// Rejoindre un covoiturage
exports.joinCarpool = async (req, res) => {
    try {
        const { userId } = req.body;
        const carpool = await Carpool.findById(req.params.id);

        if (!carpool) {
            return res.status(404).json({ message: 'Trajet non trouvé.' });
        }
        if (carpool.passengers.includes(userId)) {
            return res.status(400).json({ message: 'Cet utilisateur est déjà inscrit sur ce trajet.' });
        }
        if (carpool.passengers.length >= carpool.availableSeats) {
            return res.status(400).json({ message: 'Plus de places disponibles dans ce véhicule.' });
        }

        carpool.passengers.push(userId);
        await carpool.save();

        res.status(200).json({ message: 'Place réservée avec succès !', carpool });
    } catch (error) {
        console.error('Erreur lors de la réservation du trajet :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};