const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const { users } = new PrismaClient();

const create = async (data) => {
  try {
    const user = await users.create({ data });

    return user;
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Model -- ');
      console.log(e.message);
    }

    throw new Error('Not able to register this user');
  }
};

const update = async (id, data) => {
  try {
    const user = await users.update({
      where: { id },
      data: { ...data, update_time: new Date() },
    });

    return user;
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Model -- ');
      console.log(e.message);
    }

    throw new Error('Not able to update this user');
  }
};

const remove = async (id) => {
  try {
    const removedCount = await users.delete({ where: { id } });

    return removedCount;
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Model -- ');
      console.log(e.message);
    }

    throw new Error('Not able to remove this user');
  }
};

const find = async (where) => {
  try {
    const user = await users.findFirst({
      where,
      select: {
        id: true,
        create_time: true,
        update_time: true,
        email: true,
        name: true,
      },
    });

    return user;
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Model -- ');
      console.log(e.message);
    }

    throw new Error('Not able to find this user');
  }
};

const list = async () => {
  try {
    const allUsers = await users.findMany({
      select: {
        id: true,
        create_time: true,
        update_time: true,
        email: true,
        name: true,
      },
    });

    return allUsers;
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Model -- ');
      console.log(e.message);
    }

    throw new Error('Not able to list users');
  }
};

module.exports = {
  create,
  remove,
  update,
  find,
  list,
};
