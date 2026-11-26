const express = require('express');
const router = express.Router();
const threadController = require('../controllers/threadController');

router.post('/threads', threadController.createThread);
router.get('/threads', threadController.getAllThreads);
router.get('/threads/:id', threadController.getThreadById);
router.put('/threads/:id', threadController.updateThread);
router.delete('/threads/:id', threadController.deleteThread);

module.exports = router;