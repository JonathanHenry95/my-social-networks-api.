const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Route pour créer un nouvel événement
router.post('/events', eventController.createEvent);

// Route pour récupérer tous les événements
router.get('/events', eventController.getAllEvents);

// Route pour récupérer un événement par son ID
router.get('/events/:id', eventController.getEventById);

// Route pour mettre à jour un événement par son ID
router.put('/events/:id', eventController.updateEvent);

// Route pour supprimer un événement par son ID
router.delete('/events/:id', eventController.deleteEvent);

module.exports = router;

