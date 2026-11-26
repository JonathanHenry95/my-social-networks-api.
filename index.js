// 1. Charge les variables du fichier .env (PORT et MONGO_URI)
require('dotenv').config();

// 2. Importe les bibliothèques nécessaires
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const groupRoutes = require('./routes/groupRouter');

// 3. Initialise l'application Express
const app = express();

// 4. Middleware indispensable : permet à Express de lire le JSON envoyé dans les requêtes (POST, PUT)
app.use(express.json());
app.use('/api', userRoutes); // Préfixe toutes les routes utilisateur avec /api
app.use('/api', eventRoutes); // Préfixe toutes les routes événement avec /api
app.use('/api', groupRoutes); // Préfixe toutes les routes groupe avec /api

// 5. Route de test pour vérifier que l'API tourne
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur My Social Networks API !' });
});

// 6. Connexion à MongoDB Atlas puis démarrage du serveur
const PORT = process.env.PORT || 3000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ Connecté avec succès à MongoDB Atlas');
        app.listen(PORT, () => {
            console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Erreur de connexion à MongoDB :', err.message);
    });