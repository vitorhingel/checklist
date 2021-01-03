const { PrismaClient } = require('@prisma/client');

const { checklists } = new PrismaClient();

const create = async (data) => {
  try {
    const checklist = await checklists.create({ data });

    return checklist;
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Model -- ');
      console.log(e.message);
    }

    throw new Error('Not able to create this checklist');
  }
};

const update = async (id, data) => {
  try {
    const checklist = await checklists.update({
      where: { id },
      data: { ...data, update_time: new Date() },
    });

    return checklist;
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Model -- ');
      console.log(e.message);
    }

    throw new Error('Not able to update this checklist');
  }
};

const remove = async (id) => {
  try {
    const removedCount = await checklists.delete({ where: { id } });

    return removedCount;
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Model -- ');
      console.log(e.message);
    }

    throw new Error('Not able to remove this checklist');
  }
};

const find = async (where) => {
  try {
    const checklist = await checklists.findFirst({
      where,
      include: {
        options: {
          include: {
            users: true,
          },
        },
        users_own_checklists: {
          include: {
            users: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return checklist;
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Model -- ');
      console.log(e.message);
    }

    throw new Error('Not able to find this checklist');
  }
};

const list = async () => {
  try {
    const allChecklists = await checklists.findMany({
      include: {
        users_own_checklists: {
          include: {
            users: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return allChecklists;
  } catch (e) {
    if (parseInt(process.env.DEBUG)) {
      console.log('-- Model -- ');
      console.log(e.message);
    }

    throw new Error('Not able to list checklists');
  }
};

module.exports = {
  create,
  update,
  remove,
  find,
  list,
};
