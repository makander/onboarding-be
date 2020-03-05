const { Task } = require('../../models');
const { List } = require('../../models');
const { User } = require('../../models');
const { Department } = require('../../models');

const create = async (req, res) => {
  try {
    const { id } = req.params;
    const taskProps = req.body;

    const list = await List.findOne({ where: { id } });

    const newTask = await list.createTask(taskProps);

    res.status(200).send(newTask);
  } catch (error) {
    res.json(error);
  }
};

const list = async (req, res) => {
  try {
    const allTasks = await Task.findAll({});

    res.json(allTasks);
  } catch (error) {
    res.json(error);
  }
};

const get = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({
      where: { id },
    });

    res.json(task);
  } catch (error) {
    res.json(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({
      where: { id },
    });

    const updateTask = await task.update(req.body, {
      returning: true,
      plain: true,
    });

    res.send(updateTask);
  } catch (error) {
    res.json(error);
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.destroy({
      where: {
        id,
      },
    });
    res.status(200).send('Task deleted');
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  create,
  list,
  get,
  destroy,
  update,
};
