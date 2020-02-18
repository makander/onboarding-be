const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      role: DataTypes.ENUM('Admin', 'Guest'),
    },
    {},
  );

  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, saltRounds);
  });

  User.beforeUpdate(async (user) => {
    user.password = await bcrypt.hash(user.password, saltRounds);
  });

  User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
