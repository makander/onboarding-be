const { Op } = require('sequelize');
const moment = require('moment');
const { Department } = require('../models');
const { User } = require('../models');
const { List } = require('../models');
const { Task } = require('../models');
const { Employee } = require('../models');

const create = async (data) => {
  const { name, description, departments, listId, templateList } = data;

  if (listId != null) {
    const listId = data.listId[0];

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

    return List.findOne({ where: { id: newList.id } });
  }

  if (templateList != null && templateList !== false) {
    const newTemplateList = await List.create({
      name,
      description,
      templateList,
    });
    if (departments) {
      departments.forEach(async (department) =>
        newTemplateList.addDepartment(department, {
          through: { ListDepartment: department },
        })
      );
    }
    return List.findOne({
      where: { id: newTemplateList.id },
    });
  }
};

const all = async () => {
  return List.findAll({
    include: [
      {
        model: Task,

        include: [{ model: User.scope('withoutPassword') }],
      },
      {
        model: Department,
        include: [{ model: User.scope('withoutPassword') }],
      },
      {
        model: Employee,
      },
    ],
  });
};

const findOne = async (data) => {
  const { id } = data;

  return List.findOne({
    where: { id },
    include: [
      {
        model: Task,

        include: [{ model: User.scope('withoutPassword') }],
      },
      {
        model: Department,
        include: [{ model: User.scope('withoutPassword') }],
      },
      {
        model: Employee,
      },
    ],
  });
};

const update = async (params, data) => {
  const { id } = params;
  const {
    name,
    description,
    addedDepartment,
    status,
    templateList,
    departmentId,
    UserId,
  } = data;

  if (departmentId != null) {
    const list = await List.findOne({
      where: { id },
    });

    await list.removeDepartment(departmentId);

    return List.findOne({
      where: { id },
      include: [
        {
          model: Task,
          include: [{ model: User.scope('withoutPassword') }],
        },
        {
          model: Department,
          include: [{ model: User.scope('withoutPassword') }],
        },
      ],
    });
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

  if (addedDepartment != null) {
    await changedList.addDepartment(addedDepartment);
  }

  return List.findOne({
    where: { id },
    include: [
      {
        model: Task,
        include: [{ model: User.scope('withoutPassword') }],
      },
      {
        model: Department,
        include: [{ model: User.scope('withoutPassword') }],
      },
    ],
  });
};

const destroy = async (data) => {
  const { id } = data;
  return List.destroy({
    where: {
      id,
    },
  });
};

const findAllNotCompleted = async () => {
  await List.findAll({
    where: {
      [Op.and]: [
        { templateList: false },
        { status: false },
        {
          date: {
            [Op.lte]: moment().add(3, 'days').toDate(),
          },
        },
      ],
    },
  });
};
module.exports = {
  create,
  update,
  all,
  findOne,
  destroy,
  findAllNotCompleted,
};
