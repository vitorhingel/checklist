const { body, param } = require('express-validator');
const validator = require('validator');

const create = [
  param(`checklists_id`).isInt({ min: 1 }).withMessage(`You must provide the checklist id`),
  body(`checked`).optional().isBoolean().withMessage(`You must provide a valid value for checked`),
  body(`content`).not().isEmpty({ ignore_whitespace: true }).withMessage(`Content can't be empty`),
];

const update = [
  param(`checklists_id`).isInt({ min: 1 }).withMessage(`You must provide the checklist id`),
  param(`options_id`).isInt({ min: 1 }).withMessage(`You must provide the option id`),
  body(`checked`).optional().isBoolean().withMessage(`You must provide a valid value for checked`),
  body(`content`).not().isEmpty({ ignore_whitespace: true }).withMessage(`Content can't be empty`),
];

const remove = [param(`options_id`).isInt({ min: 1 }).withMessage(`You must provide the option id`)];

const get = [param(`options_id`).isInt({ min: 1 }).withMessage(`You must provide the option id`)];

const list = [param(`checklists_id`).isInt({ min: 1 }).withMessage(`You must provide the checklist id`)];

module.exports = { create, update, remove, get, list };
