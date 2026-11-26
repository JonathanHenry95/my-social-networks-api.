const express = require('express');
const router = express.Router();
const carpoolController = require('../controllers/carpoolController');

router.post('/carpools', carpoolController.createCarpool);
router.get('/carpools', carpoolController.getAllCarpools);
router.get('/carpools/:id', carpoolController.getCarpoolById);
router.put('/carpools/:id', carpoolController.updateCarpool);
router.delete('/carpools/:id', carpoolController.deleteCarpool);
router.post('/carpools/:id/join', carpoolController.joinCarpool);

module.exports = router;