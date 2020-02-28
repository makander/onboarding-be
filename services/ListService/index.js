const { List } = require('../../models');
const { User } = require('../../models');
const { Task } = require('../../models');

const create = async (req, res) => {
  try {
    const { id } = req.params;
    const listProps = req.body;

    const user = await User.findOne({ where: { id } });
    const newList = await List.create(listProps);
    const result = await newList.addUser(user, { through: { UserList: id } });

    res.status(200).send(result);
  } catch (error) {
    res.json(error);
  }
};

const get = async (req, res) => {
  try {
    const { id } = req.params;
    const list = await List.findOne({
      include: [
        {
          model: Task,
          where: { listId: id },
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
    const { id } = req.params;
    const lists = await List.findAll({
      include: [
        {
          model: User,
          where: { id },
        },
      ],
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
    console.log(user);
    const { id } = req.params;

    const list = await List.findOne({
      where: { id },
      include: User,
    });
    console.log(list);

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
  get,
  destroy,
  update,
};
