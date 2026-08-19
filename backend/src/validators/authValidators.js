const { body } = require('express-validator');

const loginValidator = [
  body('email').isEmail().withMessage('Ingresá un email válido'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
];

module.exports = { loginValidator };
