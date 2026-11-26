const express = require('express');
const router = express.Router();
const controller = require('../controllers/groupController');

// Route pour créer un nouveau groupe
router.post('/groups', controller.createGroup);

// Route pour récupérer tous les groupes
router.get('/groups', controller.getAllGroups);

// Route pour récupérer un groupe par son ID
router.get('/groups/:id', controller.getGroupById);

// Route pour mettre à jour un groupe par son ID
router.put('/groups/:id', controller.updateGroup);

// Route pour supprimer un groupe par son ID
router.delete('/groups/:id', controller.deleteGroup);

module.exports = router;