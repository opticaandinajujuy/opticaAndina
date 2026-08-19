const express = require('express');
const { login } = require('../controllers/authController');
const { loginValidator } = require('../validators/authValidators');
const { validate } = require('../middlewares/validateMiddleware');

const router = express.Router();

router.post('/login', loginValidator, validate, login);

module.exports = router;
