// 1. Charge les variables du fichier .env (PORT et MONGO_URI)
require('dotenv').config();

// 2. Importe les bibliothèques nécessaires
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const groupRoutes = require('./routes/groupRouter');
const threadRoutes = require('./routes/threadRoutes');
const messageRoutes = require('./routes/messageRoutes');
const albumRoutes = require('./routes/albumRoutes');
const photoRoutes = require('./routes/photoRoutes');
const commentRoutes = require('./routes/commentRoutes');
const pollRoutes = require('./routes/pollRoutes');
const ticketTypeRoutes = require('./routes/ticketTypeRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const carpoolRoutes = require('./routes/carpoolRoutes');
const shoppingItemRoutes = require('./routes/shoppingItemRoutes');

// 3. Initialise l'application Express
const app = express();

// 4. Middleware indispensable : permet à Express de lire le JSON envoyé dans les requêtes (POST, PUT)
app.use(express.json());
app.use('/api', userRoutes); // Préfixe toutes les routes utilisateur avec /api
app.use('/api', eventRoutes); // Préfixe toutes les routes événement avec /api
app.use('/api', groupRoutes); // Préfixe toutes les routes groupe avec /api
app.use('/api', threadRoutes); // Préfixe toutes les routes fil de discussion avec /api
app.use('/api', messageRoutes); // Préfixe toutes les routes message avec /api
app.use('/api', albumRoutes); // Préfixe toutes les routes album avec /api
app.use('/api', photoRoutes); // Préfixe toutes les routes photo avec /api
app.use('/api', commentRoutes); // Préfixe toutes les routes commentaire avec /api
app.use('/api', pollRoutes); // Préfixe toutes les routes sondage avec /api
app.use('/api', ticketTypeRoutes); // Préfixe toutes les routes type de ticket avec /api
app.use('/api', ticketRoutes); // Préfixe toutes les routes ticket avec /api
app.use('/api', carpoolRoutes); // Préfixe toutes les routes carpool avec /api
app.use('/api', shoppingItemRoutes); // Préfixe toutes les routes shopping item avec /api

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