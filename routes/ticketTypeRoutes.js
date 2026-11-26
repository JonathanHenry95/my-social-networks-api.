const express = require('express');
const router = express.Router();
const ticketTypeController = require('../controllers/ticketTypeController');

router.post('/ticket-types', ticketTypeController.createTicketType);
router.get('/ticket-types', ticketTypeController.getAllTicketTypes);
router.get('/ticket-types/:id', ticketTypeController.getTicketTypeById);
router.put('/ticket-types/:id', ticketTypeController.updateTicketType);
router.delete('/ticket-types/:id', ticketTypeController.deleteTicketType);

module.exports = router;