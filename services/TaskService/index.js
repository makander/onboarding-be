const chalk = require('chalk');
const { Task } = require('../../models');
const { List } = require('../../models');
const { User } = require('../../models');

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const { description } = req.body;

    const { ListId } = req.body;


    const newTask = await Task.create({ name, description });
    const listWTask = await List.findOne({ where: { id: ListId } });
    const addTask = await listWTask.addTasks(newTask);

    // await newTask.addUsers(user);

    //  const returnedTask = await newTask.addUsers(user);
    // await Task.findOne({ where: { id } });


    res.status(200).send(addTask);
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
      include: [{ model: User }],
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
    const { userId } = req.body;

    console.log(chalk.bgRedBright('id: ', id, 'userId: ', userId));
    console.log(chalk.bgRedBright('req body: ', req.body));


    if (userId) {
      const user = await User.findOne({ where: { id: userId } });
      await user.addTasks(task);

      const returnedTask = await Task.findOne({
        where: { id },
        include: [{ model: User }],

      });
      res.send(returnedTask);
    }
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
