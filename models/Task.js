
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    description: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
  }, {});
  Task.associate = function (models) {
    // associations can be defined here
    Task.belongsToMany(models.User, { through: 'UserTask', foreignKey: 'taskId' });
    Task.belongsTo(models.List);
  };
  return Task;
};
