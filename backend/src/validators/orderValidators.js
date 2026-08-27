const { body } = require('express-validator');

const updateOrderValidator = [
  body('status')
    .optional()
    .isIn(['pending', 'approved', 'rejected', 'in_process', 'cancelled'])
    .withMessage('Estado inválido'),
];

module.exports = { updateOrderValidator };
