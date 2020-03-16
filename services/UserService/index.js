const { User } = require('../../models/');

const create = async (userProps) => {
    return await User.create(userProps);
};

const update = async (updatedUser) => {
   return await user.update(updatedUser, {
      returning: true,
      plain: true,
    });
};


const deleteOne = async (id) => {
  return await User.destroy({
    where: { id }
  });
}


const findAll = async () => {
    return await User.findAll({});
};

const findOne = async (id) => {
  return await User.findOne({ where: { id } });
}

const logout = (id) => null;

module.exports = {
  create,
  update,
  deleteOne,
  findAll,
  logout,
  findOne,
};
