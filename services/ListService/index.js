const { List } = require('../../models');

const create = async (req, res) => {
  try {
    const listProps = req.body;
    await List.create(listProps);
    res.status(200).send('List Created');
  } catch (error) {
    res.json(error);
  }
};

const list = async (req, res) => {
  try {
    const allLists = await List.findAll({});

    res.json(allLists);
  } catch (error) {
    res.json(error);
  }
};

const get = async (req, res) => {
  try {
    const { id } = req.params;
    const list = await List.findOne({
      where: { id },
    });

    res.json(list);
  } catch (error) {
    res.json(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const dep = await List.findOne({
      where: { id },
    });

    const updateList = await dep.update(req.body, {
      returning: true,
      plain: true,
    });

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
