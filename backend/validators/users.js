const { body, param } = require('express-validator');

const create = [
  body('email').isEmail().withMessage('You must provide a valid email').normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Your password must have at least 8 characters')
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage('You must provide a password'),
  body('name')
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage('You must provide a name')
    .isLength({ max: 500 })
    .withMessage('Your name can contain at maximum 500 characters'),
];

const remove = [param('id').isInt({ min: 1 }).withMessage('You must provide a valid ID').toInt()];

const find = [param('id').optional().isInt({ min: 1 }).withMessage('You must provide a valid ID').toInt()];

const update = [
  param('id').isInt({ min: 1 }).withMessage('You must provide a valid ID').toInt(),
  body('email').optional().isEmail().withMessage('You must provide a valid email').normalizeEmail(),
  body('name')
    .optional()
    .not()
    .isEmpty({ ignore_whitespace: true })
    .withMessage('You must provide a name')
    .isLength({ max: 500 })
    .withMessage('The name can contain at maximum 500 characters'),
];

module.exports = {
  create,
  remove,
  find,
  update,
};
