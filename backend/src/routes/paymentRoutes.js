const express = require('express');
const { createPreference, handleWebhook } = require('../controllers/paymentController');
const { createPreferenceValidator } = require('../validators/paymentValidators');
const { validate } = require('../middlewares/validateMiddleware');

const router = express.Router();

router.post('/preference', createPreferenceValidator, validate, createPreference);
router.post('/webhook', handleWebhook);

module.exports = router;
