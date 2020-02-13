
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.ENUM('Admin', 'Guest'),
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
