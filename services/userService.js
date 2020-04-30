const { User } = require('../models');
const { List } = require('../models');
const { Department } = require('../models');
const { Task } = require('../models');

const create = async (userProps) => User.create(userProps);

const update = async (id, data) => {
  const { firstName, lastName, password, email, admin } = data;
  if (!password) {
    const user = await User.findOne({ where: { id } });
    user.update({ firstName, lastName, email, admin });
  }
  User.findOne({ where: { id } });
};

const destroy = async (id) =>
  User.destroy({
    where: { id },
  });

const all = async () => User.scope('withoutPassword').findAll({});

const findOne = async (id) => {
  return User.scope('withoutPassword').findOne({
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
