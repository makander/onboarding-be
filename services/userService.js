const { User } = require('../models');
const { List } = require('../models');
const { Department } = require('../models');
const { Task } = require('../models');

const create = async (userProps) => User.create(userProps);

const update = async (id, data) => {
  const user = await User.findOne({ where: { id } });
  user.update(data);

  User.findOne({ where: { id } });
};

const destroy = async (id) =>
  User.destroy({
    where: { id },
  });

const all = async () => User.findAll({});

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
  all,
  findOne,
  destroy,
  update,
};
