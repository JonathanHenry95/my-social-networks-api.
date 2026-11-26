const ShoppingItem = require('../models/ShoppingItem');
const Event = require('../models/Event');

exports.createShoppingItem = async (req, res) => {
    try {
        const event = await Event.findById(req.body.event);
        if (!event) {
            return res.status(404).json({ message: 'Événement non trouvé.' });
        }
        if (!event.hasShoppingList) {
            return res.status(400).json({ message: 'La shopping list n\'est pas activée pour cet événement.' });
        }

        const newItem = new ShoppingItem(req.body);
        await newItem.save();
        res.status(201).json({ message: 'Article ajouté à la shopping list !', item: newItem });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Erreur lors de l\'ajout de l\'article :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.getAllShoppingItems = async (req, res) => {
    try {
        const filter = req.query.event ? { event: req.query.event } : {};
        const items = await ShoppingItem.find(filter)
            .populate('event', 'name')
            .populate('broughtBy', 'username email');
        res.status(200).json(items);
    } catch (error) {
        console.error('Erreur lors de la récupération de la shopping list :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.getShoppingItemById = async (req, res) => {
    try {
        const item = await ShoppingItem.findById(req.params.id)
            .populate('event', 'name')
            .populate('broughtBy', 'username email');
        if (!item) {
            return res.status(404).json({ message: 'Article non trouvé.' });
        }
        res.status(200).json(item);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'article :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.updateShoppingItem = async (req, res) => {
    try {
        const updatedItem = await ShoppingItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedItem) {
            return res.status(404).json({ message: 'Article non trouvé.' });
        }
        res.status(200).json({ message: 'Article mis à jour avec succès !', item: updatedItem });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Erreur lors de la mise à jour de l\'article :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.deleteShoppingItem = async (req, res) => {
    try {
        const deletedItem = await ShoppingItem.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Article non trouvé.' });
        }
        res.status(200).json({ message: 'Article supprimé avec succès !' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'article :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};