const chalk = require('chalk');
const { List } = require('../../models');
const { User } = require('../../models');
const { Department } = require('../../models');
const { Task } = require('../../models');

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const { description } = req.body;
    const listId = req.body.listId[0];
    const { templateList } = req.body;

    console.log(listId);
    const { departments } = req.body;

    if (listId) {
      const template = await List.findOne({
        where: { id: listId },
        include: [{ model: Department }],
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'id', 'templateList'],
        },
      });

      // console.log(template);
      console.log(template.Departments);
      /*       const newList = await List.create({ template });
      console.log(newList); */


      const TemplateTasks = await Task.findAll({
        include: [
          { model: List, where: { id: listId } },
        ],
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'id', 'templateList'],
        },
      });

      const newList = await List.create({ name, description: template.description });

      Promise.all(template.Departments.map(async (department) => {
        await newList.addDepartments(department);
      }));


      Promise.all(TemplateTasks.map(async (task) => {
        const newTask = await Task.create({ name: task.name, description: task.description });
        await newList.addTasks(newTask);
      })).then(() => console.log('done')).catch((err) => console(err));


      console.log(newList.id);

      const returnedList = await List.findOne({ where: { id: newList.id } });
      console.log(returnedList);


      res.send(returnedList);
      /*       const newTask = await Task.create({ name, description });
      const listWTask = await List.findOne({ where: { id: ListId } });
      const addTask = await listWTask.addTasks(newTask); */


      // delete template
      console.log(TemplateTasks);

      // constTemplateTask = await template
    }

    /*     const newList = await List.create({ name, description, templateList });
    // newList.addUsers(id);

*/
  } catch (error) {
    res.json(error);
  }
};

const get = async (req, res) => {
  try {
    const { id } = req.params;
    const list = await List.findOne({
      where: { id },
      include: [
        {
          model: Task,
          include: [{ model: User }],
        },
        {
          model: Department,
          include: [{ model: User }],
        },
      ],
    });

    res.json(list);
  } catch (error) {
    res.json(error);
  }
};

const list = async (req, res) => {
  try {
    const lists = await List.findAll({

    });


    res.json(lists);
  } catch (error) {
    res.json(error);
  }
};

const update = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    const { id } = req.params;

    const list = await List.findOne({
      where: { id },
      include: User,
    });

    const updateList = await list.addUsers([user]);

    res.send(updateList);
  } catch (error) {
    res.json(error);
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    await List.destroy({
      where: {
        id,
      },
    });
    res.status(200).send('List deleted');
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  create,
  list,
  destroy,
  update,
  get,
};
