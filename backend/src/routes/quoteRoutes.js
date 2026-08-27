const express = require('express');
const {
  createQuote,
  getQuotes,
  updateQuoteStatus,
  updateQuote,
  deleteQuote,
} = require('../controllers/quoteController');
const { quoteValidator } = require('../validators/quoteValidators');
const { validate } = require('../middlewares/validateMiddleware');
const { requireAuth } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.post('/', upload.single('recipe'), quoteValidator, validate, createQuote);
router.get('/', requireAuth, getQuotes);
router.patch('/:id/status', requireAuth, updateQuoteStatus);
router.put('/:id', requireAuth, quoteValidator, validate, updateQuote);
router.delete('/:id', requireAuth, deleteQuote);

module.exports = router;
