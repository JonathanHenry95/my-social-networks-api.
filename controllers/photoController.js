const Photo = require('../models/Photo');

exports.createPhoto = async (req, res) => {
    try {
        const newPhoto = new Photo(req.body);
        await newPhoto.save();
        res.status(201).json({ message: 'Photo ajoutée avec succès !', photo: newPhoto });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Erreur lors de l\'ajout de la photo :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.getAllPhotos = async (req, res) => {
    try {
        const filter = req.query.album ? { album: req.query.album } : {};
        const photos = await Photo.find(filter)
            .populate('album', 'title')
            .populate('postedBy', 'username email');
        res.status(200).json(photos);
    } catch (error) {
        console.error('Erreur lors de la récupération des photos :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.getPhotoById = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id)
            .populate('album', 'title')
            .populate('postedBy', 'username email');
        if (!photo) {
            return res.status(404).json({ message: 'Photo non trouvée.' });
        }
        res.status(200).json(photo);
    } catch (error) {
        console.error('Erreur lors de la récupération de la photo :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.updatePhoto = async (req, res) => {
    try {
        const updatedPhoto = await Photo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedPhoto) {
            return res.status(404).json({ message: 'Photo non trouvée.' });
        }
        res.status(200).json({ message: 'Photo mise à jour avec succès !', photo: updatedPhoto });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Erreur lors de la mise à jour de la photo :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.deletePhoto = async (req, res) => {
    try {
        const deletedPhoto = await Photo.findByIdAndDelete(req.params.id);
        if (!deletedPhoto) {
            return res.status(404).json({ message: 'Photo non trouvée.' });
        }
        res.status(200).json({ message: 'Photo supprimée avec succès !' });
    } catch (error) {
        console.error('Erreur lors de la suppression de la photo :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};