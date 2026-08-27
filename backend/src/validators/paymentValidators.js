const { body } = require('express-validator');

const argPhoneRegex = /^(\+?54)?\s?9?\s?\d{2,4}[\s-]?\d{6,8}$/;

const createPreferenceValidator = [
  body('productId').isMongoId().withMessage('Producto inválido'),
  body('quantity').optional().isInt({ min: 1, max: 20 }).withMessage('Cantidad inválida'),
  body('buyerName').trim().notEmpty().withMessage('El nombre es obligatorio'),
  body('buyerPhone').matches(argPhoneRegex).withMessage('Ingresá un teléfono válido'),
];

module.exports = { createPreferenceValidator };
