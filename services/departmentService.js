const { Department } = require('../models');
const { User } = require('../models');
const { UserDepartment } = require('../models');
const { List } = require('../models');
const { Task } = require('../models');

const findAll = async () => {
  return Department.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: {
      model: User,
    },
  });
};

const create = async (data) => {
  const { members, name } = data;

  const newDepartment = await Department.create({ name });

  if (members.length != null) {
    await newDepartment.addUsers(members);
    return Department.findOne({
      where: { id: newDepartment.id },
      include: [
        {
          model: User.scope('withoutPassword'),
        },
      ],
    });
  }
  return Department.findOne({
    where: { id: newDepartment.id },
    include: [
      {
        model: User.scope('withoutPassword'),
      },
    ],
  });
};

const findOne = async (data) => {
  const { id } = data;
  return Department.findOne({
    where: { id },
    include: [
      {
        model: User.scope('withoutPassword'),
      },
    ],
  });
};

const update = async (params, data) => {
  const { id } = params;
  const { users } = data;
  const { name } = data;

  const department = await Department.findOne({
    where: { id },
    include: User.scope('withoutPassword'),
  });

  if (name.length !== 0) {
    await department.update({ name });
  }

  if (users.length !== 0) {
    await department.addUsers(users);
  }

  return Department.findOne({
    where: { id: department.id },
    include: User.scope('withoutPassword'),
  });
};

const destroy = async (data) => {
  const { id } = data;
  return Department.destroy({
    where: {
      id,
    },
  });
};

const removeUser = async (params, data) => {
  const { id } = params;
  const { UserId } = data;

  await UserDepartment.destroy({
    where: {
      UserId,
    },
  });

  return Department.findOne({
    where: { id },
    include: User.scope('withoutPassword'),
  });
};

const findAllTasks = async (id) => {
  return Department.findAll({
    include: [
      { model: List, where: { id } },
      {
        model: User.scope('withoutPassword'),
      },
    ],
  });
};

const findAllLists = async (id) => {
  return Department.findAll({
    include: [
      {
        model: User.scope('withoutPassword'),
        where: { id },
      },
      {
        model: List,
        include: [
          {
            model: Task,
          },
        ],
      },
    ],
  });
};
module.exports = {
  findAll,
  findAllLists,
  findAllTasks,
  findOne,
  create,
  update,
  destroy,
  removeUser,
};
