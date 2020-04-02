const chalk = require('chalk');
const { List } = require('../../models');
const { User } = require('../../models');
const { Department } = require('../../models');
const { Task } = require('../../models');
const { Employee } = require('../../models');

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const { description } = req.body;
    const { departments } = req.body;

    if (req.body.listId) {
      const listId = req.body.listId[0];

      const template = await List.findOne({
        where: { id: listId },
        include: [{ model: Department }],
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'id', 'templateList'],
        },
      });

      const TemplateTasks = await Task.findAll({
        include: [{ model: List, where: { id: listId } }],
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'id', 'templateList'],
        },
      });

      const newList = await List.create({
        name,
        description: template.description,
      });

      template.Departments.forEach(async (department) => {
        await newList.addDepartments(department);
      });

      TemplateTasks.forEach(async (task) => {
        const newTask = await Task.create({
          name: task.name,
          description: task.description,
        });
        await newList.addTasks(newTask);
      });

      const returnedList = await List.findOne({ where: { id: newList.id } });

      res.send(returnedList);
    }
    if (req.body.templateList) {
      const { templateList } = req.body;
      const newTemplateList = await List.create({
        name,
        description,
        templateList,
      });
      if (departments) {
        departments.map(async (department) =>
          newTemplateList.addDepartment(department, {
            through: { ListDepartment: department },
          })
        );
      }
      const returnedList = await List.findOne({
        where: { id: newTemplateList.id },
      });
      res.send(returnedList);
    }
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
        {
          model: Employee,
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
    const lists = await List.findAll({});

    res.json(lists);
  } catch (error) {
    res.json(error);
  }
};

const update = async (req, res) => {
  try {
    // const { email } = req.body;
    // const user = await User.findOne({ where: { email } });
    console.log(req.body);
    const { id } = req.params;
    const { name } = req.body;
    const { description } = req.body;
    const { addedDepartment } = req.body;
    const { status } = req.body;
    const { templateList } = req.body;
    const { departmentId } = req.body;

    if (departmentId) {
      const list = await List.findOne({
        where: { id },
      });

      await list.removeDepartment(departmentId);
      // const updateList = await list.addUsers([user]);

      const removedDepartment = await List.findOne({
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

      res.send(removedDepartment);
    }

    const list = await List.findOne({
      where: { id },
    });

    const changedList = await list.update({
      name,
      description,
      status,
      templateList,
    });

    if (addedDepartment) {
      await changedList.addDepartment({ addedDepartment });
    }
    const updated = await List.findOne({
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

    res.send(updated);
  } catch (error) {
    res.json(error);
  }
};

const removeUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { UserId } = req.body;

    await DepartmentList.destroy({
      where: {
        UserId,
        DepartmentId: id,
      },
    });

    const response = await Department.findOne({
      where: { id },
      include: User,
    });

    res.send(response);
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
  removeUser,
};
