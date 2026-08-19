const { body } = require('express-validator');

const brandValidator = [
  body('name').trim().notEmpty().withMessage('El nombre es obligatorio'),
  body('logo').trim().notEmpty().withMessage('El logo es obligatorio'),
  body('order').optional().isInt().withMessage('Orden inválido'),
];

module.exports = { brandValidator };
