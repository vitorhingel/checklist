const { PrismaClient } = require('@prisma/client');

const { options } = new PrismaClient();

const create = async (data) => {
  const { user, checklist, checked, content } = data;

  let data = {};

  if (user !== undefined)
    data.users = {
      connect: {
        id: user.id,
      },
    };

  if (checklist)
    data.checklists = {
      connect: {
        id: checklist.id,
      },
    };

  if (checked !== undefined) data.checked = checked;

  if (content !== undefined) data.content = content;

  try {
    const option = await options.create({ data });

    return option;
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Model -- ');
      console.log(e.message);
    }

    throw new Error('Not able to create this option');
  }
};

const update = async (id, data) => {
  const { user, checklist, checked, content } = data;

  let data = {};

  if (user !== undefined)
    data.users = {
      connect: {
        id: user.id,
      },
    };

  if (checklist)
    data.checklists = {
      connect: {
        id: checklist.id,
      },
    };

  if (checked !== undefined) data.checked = checked;

  if (content !== undefined) data.content = content;

  data.update_time = new Date();

  try {
    const option = await options.update({
      where: { id },
      data,
    });

    return option;
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Model -- ');
      console.log(e.message);
    }

    throw new Error('Not able to update this option');
  }
};

const remove = async (id) => {
  try {
    const removedCount = await options.delete({ where: { id } });

    return removedCount;
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Model -- ');
      console.log(e.message);
    }

    throw new Error('Not able to remove the option');
  }
};

const find = async (where) => {
  try {
    const option = await options.findMany({
      where,
      include: {
        users: {
          select: {
            email: true,
            name: true,
          },
        },
        checklists: true,
      },
    });

    return option;
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Model -- ');
      console.log(e.message);
    }

    throw new Error('Not able to find any option');
  }
};

const list = async ({ where }) => {
  try {
    const listOptions = await options.findMany({ where });

    return listOptions;
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Model -- ');
      console.log(e.message);
    }

    throw new Error('Not able to list options');
  }
};

module.exports = {
  create,
  update,
  remove,
  find,
  list,
};
