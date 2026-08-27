const { body } = require('express-validator');

const productValidator = [
  body('name').trim().notEmpty().withMessage('El nombre es obligatorio'),
  body('category')
    .isIn(['sol', 'contacto', 'receta', 'accesorios'])
    .withMessage('Categoría inválida'),
  body('subcategory')
    .optional({ checkFalsy: true })
    .isIn(['panos', 'colgantes', 'liquidos'])
    .withMessage('Subcategoría inválida'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Precio inválido'),
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock inválido'),
];

module.exports = { productValidator };
