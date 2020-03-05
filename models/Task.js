
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    description: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
  }, {});
  Task.associate = function (models) {
    // associations can be defined here
    Task.belongsTo(models.User);
    Task.belongsTo(models.List);
  };
  return Task;
};
