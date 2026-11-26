const Album = require('../models/Album');

exports.createAlbum = async (req, res) => {
    try {
        const newAlbum = new Album(req.body);
        await newAlbum.save();
        res.status(201).json({ message: 'Album créé avec succès !', album: newAlbum });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Erreur lors de la création de l\'album :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.getAllAlbums = async (req, res) => {
    try {
        const filter = req.query.event ? { event: req.query.event } : {};
        const albums = await Album.find(filter)
            .populate('event', 'name')
            .populate('createdBy', 'username email');
        res.status(200).json(albums);
    } catch (error) {
        console.error('Erreur lors de la récupération des albums :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.getAlbumById = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id)
            .populate('event', 'name')
            .populate('createdBy', 'username email');
        if (!album) {
            return res.status(404).json({ message: 'Album non trouvé.' });
        }
        res.status(200).json(album);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'album :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.updateAlbum = async (req, res) => {
    try {
        const updatedAlbum = await Album.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedAlbum) {
            return res.status(404).json({ message: 'Album non trouvé.' });
        }
        res.status(200).json({ message: 'Album mis à jour avec succès !', album: updatedAlbum });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Erreur lors de la mise à jour de l\'album :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.deleteAlbum = async (req, res) => {
    try {
        const deletedAlbum = await Album.findByIdAndDelete(req.params.id);
        if (!deletedAlbum) {
            return res.status(404).json({ message: 'Album non trouvé.' });
        }
        res.status(200).json({ message: 'Album supprimé avec succès !' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'album :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};