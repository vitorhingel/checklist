const { PrismaClient } = require('@prisma/client');

const { users_own_checklists } = new PrismaClient();

const create = async (data) => {
  const { user, checklist, role } = data;
  try {
    const userOwnChecklist = await users_own_checklists.create({
      data: {
        users: {
          connect: {
            id: user.id,
          },
        },
        checklists: {
          connect: {
            id: checklist.id,
          },
        },
        role,
      },
    });

    return userOwnChecklist;
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Model -- ');
      console.log(e.message);
    }

    throw new Error('Not able to create the relationship between the user and the checklist');
  }
};

const update = async (id, data) => {
  const { user, checklist, role } = data;

  let data = {};

  if (user !== undefined)
    data.users = {
      connect: {
        id: user.id,
      },
    };

  if (checklist !== undefined)
    data.checklists = {
      connect: {
        id: checklist.id,
      },
    };

  if (role !== undefined) data.role = role;

  data.update_time = new Date();

  try {
    const userOwnChecklist = await users_own_checklists.update({
      where: { id },
      data,
    });

    return userOwnChecklist;
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Model -- ');
      console.log(e.message);
    }

    throw new Error('Not able to update the relationship between the user and the checklist');
  }
};

const remove = async (id) => {
  try {
    const removedCount = await users_own_checklists.delete({ where: { id } });

    return removedCount;
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Model -- ');
      console.log(e.message);
    }

    throw new Error('Not able to remove the relationship between the user and the checklist');
  }
};

const find = async (where) => {
  try {
    const usersOwnChecklists = await users_own_checklists.findMany({
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

    return usersOwnChecklists;
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Model -- ');
      console.log(e.message);
    }

    throw new Error('Not able to find any relationship in this checklist');
  }
};

module.exports = {
  create,
  update,
  remove,
  find,
};
