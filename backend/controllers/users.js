const usersModel = require('../models/users');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { email, name, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await usersModel.create({ email, name, password: hashedPassword });

    return res.status(201).send(user);
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

  const { id } = req.params;

  try {
    const user = await usersModel.find({ id });
    if (!user) return res.status(404).send({ message: 'User not found' });

    await usersModel.remove(id);

    return res.status(204).send();
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Controller -- ');
      console.log(e);
    }

    return res.status(400).send({ message: e.message });
  }
};

const find = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { id } = req.params;

  try {
    const user = await usersModel.find({ id });

    if (!user) return res.status(404).send({ message: 'User not found' });

    return res.send(user);
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

  const { id } = req.params;
  const { email, name } = req.body;

  try {
    const user = await usersModel.find({ id });

    if (!user) return res.status(404).send({ message: 'User not found' });

    let updatedUser = await usersModel.update(id, {
      email: email ? email : user.email,
      name: name ? name : user.name,
    });

    delete updatedUser.password;

    return res.send(updatedUser);
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Controller -- ');
      console.log(e);
    }

    return res.status(400).send({ message: e.message });
  }
};

const list = async (req, res) => {
  try {
    const users = await usersModel.list();

    return res.send(users);
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
  remove,
  find,
  update,
  list,
};
