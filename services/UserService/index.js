const { User } = require('../../models/');

const create = async (req, res) => {
  const userProps = req.body;
  console.log(req.body);
  try {
    await User.create(userProps).then(() => res.status(200).send('user created'));
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    const updateUser = await user.update(req.body, {
      returning: true,
      plain: true,
    });
    console.log(user);
    console.log(updateUser);
    res.send(updateUser);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};


const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({
      where: {
        id,
      },
    });
    res.status(200).send('User deleted');
  } catch (error) {
    console.log(error);
  }
};

const list = async (req, res) => {
  try {
    const users = await User.findAll({});

    res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
};

const logout = (id) => null;


module.exports = {
  create,
  update,
  destroy,
  list,
  logout,

};
