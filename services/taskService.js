const { User } = require('../models');
const { List } = require('../models');
const { Task } = require('../models');

const create = async (data) => {
  const { name, description, ListId } = data;

  const newTask = await Task.create({ name, description });
  const listWTask = await List.findOne({ where: { id: ListId } });
  listWTask.addTasks(newTask);

  return newTask;
};

const findAll = async () => {
  return Task.findAll({});
};

const findOne = async (data) => {
  const { id } = data;
  return Task.findOne({
    where: { id },
    include: [{ model: User.scope('withoutPassword') }],
  });
};

const update = async (params, data) => {
  const { id } = params;
  const { userId } = data;

  const task = await Task.findOne({
    where: { id },
  });

  if (userId != null && userId !== '') {
    const user = await User.findOne({ where: { id: userId } });
    await user.addTasks(task);

    return Task.findOne({
      where: { id },
      include: [{ model: User.scope('withoutPassword') }],
    });
  }
  return task.update(data);
};

const destroy = async (params) => {
  const { id } = params;
  return Task.destroy({
    where: {
      id,
    },
  });
};
module.exports = {
  create,
  update,
  findOne,
  findAll,
  destroy,
};
