const { User } = require('../models');
const { List } = require('../models');
const { Department } = require('../models');
const { Task } = require('../models');

const create = async (userProps) => User.create(userProps);

const update = async (updatedUser) =>
  User.update(updatedUser, {
    returning: true,
    plain: true,
  });

const destroy = async (id) =>
  User.destroy({
    where: { id },
  });

const findAll = async () => User.findAll({});

const findOne = async (id) => {
  return User.findOne({
    where: { id },
    include: [
      {
        model: Department,
      },
      {
        model: List,
      },
      {
        model: Task,
      },
    ],
  });
};

module.exports = {
  create,
  findAll,
  findOne,
  destroy,
  update,
};
