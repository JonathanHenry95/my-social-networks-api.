const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Vérifie si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Un utilisateur avec cet e-mail existe déjà.' });
        }

        // Crée un nouvel utilisateur
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: 'Utilisateur créé avec succès !', user: newUser });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Erreur : l\'email ou le nom d\'utilisateur existe déjà.' });
        }
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { username, email, password },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        res.status(200).json({ message: 'Utilisateur mis à jour avec succès !', user: updatedUser });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Erreur : l\'email ou le nom d\'utilisateur existe déjà.' });
        }
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.status(200).json({ message: 'Utilisateur supprimé avec succès !' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
};