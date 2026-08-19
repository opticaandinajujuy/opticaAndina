const express = require('express');
const {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} = require('../controllers/brandController');
const { brandValidator } = require('../validators/brandValidators');
const { validate } = require('../middlewares/validateMiddleware');
const { requireAuth } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getBrands);
router.post('/', requireAuth, brandValidator, validate, createBrand);
router.put('/:id', requireAuth, brandValidator, validate, updateBrand);
router.delete('/:id', requireAuth, deleteBrand);

module.exports = router;
