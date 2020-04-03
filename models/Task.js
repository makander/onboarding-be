
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    description: DataTypes.TEXT,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      min: 2,
    },
  }, {});
  Task.associate = function (models) {
    // associations can be defined here
    Task.belongsTo(models.User);
    Task.belongsTo(models.List);
  };
  return Task;
};
