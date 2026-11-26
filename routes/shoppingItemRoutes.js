const express = require('express');
const router = express.Router();
const shoppingItemController = require('../controllers/shoppingItemController');

router.post('/shopping-items', shoppingItemController.createShoppingItem);
router.get('/shopping-items', shoppingItemController.getAllShoppingItems);
router.get('/shopping-items/:id', shoppingItemController.getShoppingItemById);
router.put('/shopping-items/:id', shoppingItemController.updateShoppingItem);
router.delete('/shopping-items/:id', shoppingItemController.deleteShoppingItem);

module.exports = router;