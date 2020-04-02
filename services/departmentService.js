const { Department } = require('../models');
const { User } = require('../models');
// const { UserDepartment } = require('../models');
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
  const { users, name } = data;

  const newDepartment = await Department.create({ name });

  if (users.length != null) {
    await newDepartment.addUsers(users);
    return Department.findOne({
      where: { id: newDepartment.id },
      include: [
        {
          model: User,
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'role', 'password'],
          },
        },
      ],
    });
  }
  return Department.findOne({
    where: { id: newDepartment.id },
    include: [
      {
        model: User,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'role', 'password'],
        },
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
        model: User,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'role', 'password'],
        },
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
    include: User,
  });

  if (name.length !== 0) {
    return department.update({ name });
  }

  if (users.length !== 0) {
    return department.addUsers(users);
  }

  return Department.findOne({
    where: { id: department.id },
    include: User,
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

  await Department.removeUser(UserId);

  return Department.findOne({
    where: { id },
    include: User,
  });
};

const findAllTasks = async (id) => {
  return Department.findAll({
    include: [
      { model: List, where: { id } },
      {
        model: User,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'role', 'password'],
        },
      },
    ],
  });
};

const findAllLists = async (id) => {
  console.log('AM INSIDE YOUR BASE');
  return Department.findAll({
    include: [
      {
        model: User,
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
