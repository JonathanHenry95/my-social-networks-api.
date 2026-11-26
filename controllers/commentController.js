const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
    try {
        const newComment = new Comment(req.body);
        await newComment.save();
        res.status(201).json({ message: 'Commentaire ajouté avec succès !', comment: newComment });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Erreur lors de l\'ajout du commentaire :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.getAllComments = async (req, res) => {
    try {
        const filter = req.query.photo ? { photo: req.query.photo } : {};
        const comments = await Comment.find(filter)
            .populate('photo', 'imageUrl caption')
            .populate('author', 'username email');
        res.status(200).json(comments);
    } catch (error) {
        console.error('Erreur lors de la récupération des commentaires :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
            .populate('photo', 'imageUrl caption')
            .populate('author', 'username email');
        if (!comment) {
            return res.status(404).json({ message: 'Commentaire non trouvé.' });
        }
        res.status(200).json(comment);
    } catch (error) {
        console.error('Erreur lors de la récupération du commentaire :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.updateComment = async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedComment) {
            return res.status(404).json({ message: 'Commentaire non trouvé.' });
        }
        res.status(200).json({ message: 'Commentaire mis à jour avec succès !', comment: updatedComment });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Erreur lors de la mise à jour du commentaire :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Commentaire non trouvé.' });
        }
        res.status(200).json({ message: 'Commentaire supprimé avec succès !' });
    } catch (error) {
        console.error('Erreur lors de la suppression du commentaire :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};