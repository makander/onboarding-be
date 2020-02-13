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

const get = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};

const update = async (req, res) => {
  const Id = req.params.id;
  const userProps = req.body;
  try {
    const result = await User.findOne({
      where: {
        id: Id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const destroy = async (req, res) => {
  const userProps = req.body;
  try {
    await User.destroy();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  create,
  get,
  update,
  destroy,
};
