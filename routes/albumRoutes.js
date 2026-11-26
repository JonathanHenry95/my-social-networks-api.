const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');

router.post('/albums', albumController.createAlbum);
router.get('/albums', albumController.getAllAlbums);
router.get('/albums/:id', albumController.getAlbumById);
router.put('/albums/:id', albumController.updateAlbum);
router.delete('/albums/:id', albumController.deleteAlbum);

module.exports = router;