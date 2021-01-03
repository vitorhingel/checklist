const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const usersValidators = require('../validators/users');

router.post('/users', usersValidators.create, usersController.create);
router.get('/user/:id', usersValidators.find, usersController.find);
router.get('/users', usersController.list);
router.patch('/user/:id', usersValidators.update, usersController.update);
router.delete('/user/:id', usersValidators.remove, usersController.remove);
module.exports = router;
