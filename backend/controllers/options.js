const optionsModel = require('../models/options');
const usersModel = require('../models/users');
const checklistsModel = require('../models/checklists');

const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const users_id = req.loggedUser.id;
  const { checklists_id } = req.params;
  const { checked, content } = req.body;

  try {
    const user = await usersModel.find({ where: { id: users_id } });
    if (!user) return res.status(404).send({ message: 'This user was not found' });

    const checklist = await checklistsModel.find({ where: { id: checklists_id } });
    if (!checklist) return res.status(404).send({ message: 'This checklist was not found' });

    const createdOption = await optionsModel.create({ user, checklist, content, checked });

    return res.status(201).send(createdOption);
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Controller -- ');
      console.log(e);
    }

    return res.status(400).send({ message: e.message });
  }
};

const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const users_id = req.loggedUser.id;
  const { checklists_id, options_id } = req.params;
  const { checked, content } = req.body;

  try {
    const user = await usersModel.find({ where: { id: users_id } });
    if (!user) return res.status(404).send({ message: 'This user was not found' });

    const checklist = await checklistsModel.find({ where: { id: checklists_id } });
    if (!checklist) return res.status(404).send({ message: 'This checklist was not found' });

    const option = await optionsModel.find({ where: { id: options_id } });
    if (!option) return res.status(404).send({ message: 'This option was not found' });

    const updateOption = await optionsModel.update(options_id, { user, checklist, content, checked });

    return res.send(updateOption);
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Controller -- ');
      console.log(e);
    }

    return res.status(400).send({ message: e.message });
  }
};

const remove = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { options_id } = req.params;

  try {
    const option = await optionsModel.find({ where: { id: options_id } });
    if (!option) return res.status(404).send({ message: 'This option was not found' });

    const removedCount = await optionsModel.remove(options_id);

    return res.send(removedCount);
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Controller -- ');
      console.log(e);
    }

    return res.status(400).send({ message: e.message });
  }
};

const get = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { options_id } = req.params;

  try {
    const option = await optionsModel.find({ where: { id: options_id } });
    if (!option) return res.status(404).send({ message: 'This option was not found' });

    return res.send(option);
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Controller -- ');
      console.log(e);
    }

    return res.status(400).send({ message: e.message });
  }
};

const list = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { checklists_id } = req.params;

  try {
    const options = await optionsModel.list({ where: { checklists_id } });

    return res.send(options);
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Controller -- ');
      console.log(e);
    }

    return res.status(400).send({ message: e.message });
  }
};

module.exports = {
  create,
  update,
  remove,
  get,
  list,
};
