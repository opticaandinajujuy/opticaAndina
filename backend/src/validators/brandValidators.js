const { body } = require('express-validator');

const brandValidator = [
  body('logoUrl').trim().notEmpty().withMessage('El logo es obligatorio'),
];

module.exports = { brandValidator };
