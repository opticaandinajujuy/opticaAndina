const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { productValidator } = require('../validators/productValidators');
const { validate } = require('../middlewares/validateMiddleware');
const { requireAuth } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', requireAuth, productValidator, validate, createProduct);
router.put('/:id', requireAuth, productValidator, validate, updateProduct);
router.delete('/:id', requireAuth, deleteProduct);

module.exports = router;
