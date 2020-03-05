'use strict';
module.exports = (sequelize, DataTypes) => {
  const TemplateTask = sequelize.define('TemplateTask', {
    userId: DataTypes.INTEGER,
    taskId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    listID: DataTypes.INTEGER
  }, {});
  TemplateTask.associate = function(models) {
    // associations can be defined here
  };
  return TemplateTask;
};