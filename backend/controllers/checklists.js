const checklistsModel = require('../models/checklists');
const { validationResult } = require('express-validator');

const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, public } = req.body;

  try {
    const checklist = await checklistsModel.create({ name, public });

    return res.status(201).send(checklist);
  } catch (e) {
    return res.status(400).send({ message: 'Error creating the checklist, please try again' });
  }
};

const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, public } = req.body;
  const { id } = req.params;

  try {
    const checklist = await checklistsModel.update(id, { name, public });

    return res.send(checklist);
  } catch (e) {
    return res.status(400).send({ message: 'Error creating the checklist, please try again' });
  }
};

const remove = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const removedCount = await checklistsModel.remove(id);

    return res.status(204).send();
  } catch (e) {
    return res.status(400).send({ message: 'Error creating the checklist, please try again' });
  }
};

const find = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { id } = req.params;

  try {
    const findChecklist = await checklistsModel.find({ id });

    if (!findChecklist) return res.status(404).send();

    return res.send(findChecklist);
  } catch (e) {
    return res.status(400).send({ message: 'Error creating the checklist, please try again' });
  }
};

module.exports = {
  create,
  update,
  remove,
  find,
};
