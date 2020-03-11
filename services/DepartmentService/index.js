const { Department } = require('../../models');
const { User } = require('../../models');


const create = async (req, res) => {
  try {
    const users = req.body.users.value;
    const { name } = req.body;
    const { description } = req.body;
    const newDepartment = await Department.create({ name, description });
    users.map(async (user) => newDepartment.addUser(user, { through: { UserDepartment: user } }));
    res.status(200).send('Department Created');
  } catch (error) {
    res.json(error);
  }
};

const list = async (req, res) => {
  try {
    const allDeps = await Department.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });

    res.json(allDeps);
  } catch (error) {
    res.json(error);
  }
};

const get = async (req, res) => {
  try {
    const { id } = req.params;
    const dep = await Department.findOne({
      where: { id },
    });

    res.json(dep);
  } catch (error) {
    res.json(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const dep = await Department.findOne({
      where: { id },
    });

    const updateDep = await dep.update(req.body, {
      returning: true,
      plain: true,
    });

    res.send(updateDep);
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
module.exports = {
  create,
  list,
  get,
  destroy,
  update,
};
