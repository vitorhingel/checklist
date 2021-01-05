const { PrismaClient } = require('@prisma/client');

const { tokens } = new PrismaClient();

const create = async (data) => {
  const { user, content } = data;

  let data = {
    content,
    users: {
      connect: {
        id: user.id,
      },
    },
  };

  try {
    const token = await tokens.create({ data });

    return token;
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Model -- ');
      console.log(e.message);
    }

    throw new Error('Not able to create this token');
  }
};

const update = async (id, data) => {
  const { user, content } = data;

  let data = {};

  if (user !== undefined)
    data.users = {
      connect: {
        id: user.id,
      },
    };

  if (content !== undefined) data.content = content;

  data.update_time = new Date();

  try {
    const token = await tokens.update({
      where: { id },
      data,
    });

    return token;
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Model -- ');
      console.log(e.message);
    }

    throw new Error('Not able to update this token');
  }
};

const remove = async (id) => {
  try {
    const removedCount = await tokens.delete({ where: { id } });

    return removedCount;
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Model -- ');
      console.log(e.message);
    }

    throw new Error('Not able to remove the token');
  }
};

const find = async (where) => {
  try {
    const option = await tokens.findMany({
      where,
    });

    return option;
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Model -- ');
      console.log(e.message);
    }

    throw new Error('Not able to find any token');
  }
};

module.exports = {
  create,
  update,
  remove,
  find,
};
