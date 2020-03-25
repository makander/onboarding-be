/* eslint-disable linebreak-style */
const { List } = require('../models');

const { Department } = require('../models');
const { Task } = require('../models');
const { Employee } = require('../models');

const create = async (data) => {
  const {
    firstName, lastName, description, title, email, address, name, phoneNumber, listId, office,
  } = data;

  if (listId !== null || listId.length !== 0) {
    const templateListId = listId[0];

    const template = await List.findOne({
      where: { id: templateListId },
      include: [{ model: Department }],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'id', 'templateList'],
      },
    });

    const TemplateTasks = await Task.findAll({
      include: [
        { model: List, where: { id: templateListId } },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'id', 'templateList'],
      },
    });

    const newList = await List.create({ name: `${template.name} ${firstName} ${lastName}`, description: template.description });

    const newEmployee = await Employee.create({
      firstName, lastName, phoneNumber, email, title, address, office,
    });

    await newList.setEmployee(newEmployee);

    TemplateTasks.forEach(async (task) => {
      const newTask = await Task.create({ name: task.name, description: task.description });
      await newList.addTasks(newTask);
    });

    template.Departments.forEach(async (department) => newList.addDepartments(department));

    return List.findOne({ where: { id: newList.id } });
  }

  const newList = await List.create({ name, description });

  await newList.addEmployee({
    firstName, lastName, phoneNumber, email, title, address,
  });

  return List.findOne({ where: { id: newList.id } });
};
module.exports = {
  create,

};
