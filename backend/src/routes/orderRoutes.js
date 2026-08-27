const express = require('express');
const { getOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const { updateOrderValidator } = require('../validators/orderValidators');
const { validate } = require('../middlewares/validateMiddleware');
const { requireAuth } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', requireAuth, getOrders);
router.put('/:id', requireAuth, updateOrderValidator, validate, updateOrder);
router.delete('/:id', requireAuth, deleteOrder);

module.exports = router;
