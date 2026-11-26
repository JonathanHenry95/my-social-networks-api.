const express = require('express');
const router = express.Router();
const pollController = require('../controllers/pollController');

router.post('/polls', pollController.createPoll);
router.get('/polls', pollController.getAllPolls);
router.get('/polls/:id', pollController.getPollById);
router.put('/polls/:id', pollController.updatePoll);
router.delete('/polls/:id', pollController.deletePoll);
router.post('/polls/:id/vote', pollController.votePoll);

module.exports = router;