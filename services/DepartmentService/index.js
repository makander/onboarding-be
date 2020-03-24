const chalk = require('chalk');
const { Department } = require('../../models');
const { User } = require('../../models');
const { UserDepartment } = require('../../models');
const { List } = require('../../models');


const create = async (req, res) => {
  try {
    const { users } = req.body;
    const { name } = req.body;
    const newDepartment = await Department.create({ name });

    if (users.length !== 0) {
      await newDepartment.addUsers(users);
      const response = await Department.findOne({
        where: { id: newDepartment.id },
        include: [
          {
            model: User,
            attributes: { exclude: ['createdAt', 'updatedAt', 'role', 'password'] },
          }],
      });

      res.send(response);
    } else {
      const depWithoutUsers = await Department.findOne({
        where: { id: newDepartment.id },
        include: [
          {
            model: User,
            attributes: { exclude: ['createdAt', 'updatedAt', 'role', 'password'] },
          }],
      });
      res.send(depWithoutUsers);
    }
  } catch (error) {
    res.json(error);
  }
};

const findAll = async (req, res) => {
  try {
    const allDeps = await Department.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include:
        {
          model: User,

        },
    });

    res.json(allDeps);
  } catch (error) {
    res.json(error);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const dep = await Department.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: { exclude: ['createdAt', 'updatedAt', 'role', 'password'] },
        }],
    });

    res.json(dep);
  } catch (error) {
    res.json(error);
  }
};

const findAllDepartmentTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const dep = await Department.findAll({

      include: [
        { model: List, where: { id } },
        {
          model: User,
          attributes: { exclude: ['createdAt', 'updatedAt', 'role', 'password'] },
        }],
    });

    res.json(dep);
  } catch (error) {
    res.json(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { users } = req.body;
    const { name } = req.body;
    console.log(chalk.red.redBright(req.body));

    const department = await Department.findOne({
      where: { id },
      include: User,
    });

    if (name.length !== 0) {
      const updated = await department.update({ name });
      console.dir(chalk.red.redBright(updated));
    }

    // const updated = await department.update({ name });

    if (users.length !== 0) {
      const updateWithUsers = await department.addUsers(users);
      console.log('Uppdatera users',
        JSON.stringify(updateWithUsers, null, 2));
    }

    const response = await Department.findOne({
      where: { id: department.id },
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
    await Department.destroy({
      where: {
        id,
      },
    });
    res.status(200).send('Deparment deleted');
  } catch (error) {
    console.log(error);
  }
};


const removeUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { UserId } = req.body;

    await UserDepartment.destroy({
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

const findAllDepartmentLists = async (req, res) => {
  try {
    const id = req.userId;
    const lists = await Department.findAll({
      include: [
        {
          model: User,
          where: { id },
        },
        {
          model: List,
        },
      ],

    });


    res.json(lists);
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  create,
  findAll,
  findOne,
  destroy,
  update,
  removeUser,
  findAllDepartmentTasks,
  findAllDepartmentLists,
};
