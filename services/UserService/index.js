const User = require('../../models/User');

const create = async (req, res) => {
  const userProps = req.body;
  try {
    await User.create(userProps).then(res.status(200).send('user created'));
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  create,
};
