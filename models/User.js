
const bcrypt = require('bcrypt');

const options = {
  salt: 10,
};
const saltRounds = 10;
const secret = 'Mmmh,IPA';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.ENUM('Admin', 'Guest'),
  },
  {});

  User.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
  });

  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
