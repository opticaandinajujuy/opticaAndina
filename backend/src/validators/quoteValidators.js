const { body } = require('express-validator');

const argPhoneRegex = /^(\+?54)?\s?9?\s?\d{2,4}[\s-]?\d{6,8}$/;

const quoteValidator = [
  body('name').trim().notEmpty().withMessage('El nombre es obligatorio'),
  body('phone').matches(argPhoneRegex).withMessage('Ingresá un teléfono válido'),
  body('email').isEmail().withMessage('Ingresá un email válido'),
  body('consultationType')
    .optional()
    .isIn(['sol', 'contacto', 'receta', 'otro'])
    .withMessage('Tipo de consulta inválido'),
  body('message').trim().notEmpty().withMessage('El mensaje es obligatorio'),
];

module.exports = { quoteValidator };
