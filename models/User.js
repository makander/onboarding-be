const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 32],
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 32],
      },
    },
    password: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: [6, 32],
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
        len: [6, 32],
      },
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, saltRounds);
  });

  User.beforeUpdate(async (user) => {
    user.password = await bcrypt.hash(user.password, saltRounds);
  });

  User.prototype.validPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.List, { through: 'UserList' });
    // User.belongsToMany(models.Task, { through: 'UserTask', foreignKey: 'taskId' });
    User.hasMany(models.Task);
    User.belongsToMany(models.Department, { through: 'UserDepartment' });
  };
  return User;
};
