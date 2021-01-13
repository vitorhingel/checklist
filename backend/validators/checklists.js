const { body, param } = require('express-validator');
const validator = require('validator');

const create = [
  body('name').isLength({ max: 500 }).withMessage('Maximum quantity of characters are 500.').not().isEmpty({ ignore_whitespace: true }).withMessage("Name can't be empty"),
  body('public').isBoolean().withMessage('You must inform if the checklist is public or not'),
];

const update = [
  body('name').isLength({ max: 500 }).withMessage('Maximum quantity of characters are 500.').not().isEmpty({ ignore_whitespace: true }).withMessage("Name can't be empty"),
  body('public').isBoolean().withMessage('You must inform if the checklist is public or not'),
  param('id').isInt({ min: 1 }).withMessage('You must provide the id'),
];

const remove = [param('id').isInt({ min: 1 }).withMessage('You must provide the id')];

const find = [param('id').isInt({ min: 1 }).withMessage('You must provide the id')];

module.exports = {
  create,
  update,
  remove,
  find,
};
