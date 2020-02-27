const { Task } = require('../../models');

const create = async (req, res) => {
  try {
    const taskProps = req.body;
    await Task.create(taskProps);
    res.status(200).send('Task Created');
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
