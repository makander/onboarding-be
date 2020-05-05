const { List } = require('../models');

const { Department } = require('../models');
const { Task } = require('../models');
const { Employee } = require('../models');

const create = async (data) => {
  const {
    firstName,
    lastName,
    description,
    title,
    email,
    address,
    phoneNumber,
    listId,
    office,
    startDate,
    endDate,
  } = data;

  if (listId !== null && listId !== '') {
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
      name: `${template.name} ${firstName} ${lastName}`,
      description: template.description,
      startDate,
      endDate,
    });

    const newEmployee = await Employee.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      title,
      address,
      office,
    });

    await newList.setEmployee(newEmployee);

    TemplateTasks.forEach(async (task) => {
      const newTask = await Task.create({
        name: task.name,
        description: task.description,
      });
      await newList.addTasks(newTask);
    });

    template.Departments.forEach(async (department) =>
      newList.addDepartments(department)
    );

    return List.findOne({ where: { id: newList.id } });
  }

  const newList = await List.create({
    name: `${firstName} ${lastName}`,
    description,
  });

  const newEmployee = await Employee.create({
    firstName,
    lastName,
    phoneNumber,
    email,
    title,
    address,
    office,
  });

  await newList.setEmployee(newEmployee);

  return List.findOne({ where: { id: newList.id } });
};
module.exports = {
  create,
};
