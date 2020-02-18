const { User } = require('../../models/');

const create = async (req, res) => {
  const userProps = req.body;
  console.log(req.body);
  try {
    await User.create(userProps).then(() => res.status(200).send('user created'));
  } catch (error) {
    console.log(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      email, password, firstName, lastName,
    } = req.body;

    await User.update({
      email, password, firstName, lastName,
    }, {
      where: {
        id,
      },
      returning: true,
      plain: true,
    });

    const updatedUser = await User.findOne({
      where: {
        id,
      },
    });

    res.send(updatedUser);
  } catch (error) {
    console.log(error);
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
    res.status(200).send('User destroyed');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  create,
  update,
  destroy,
};
