'use strict';
module.exports = (sequelize, DataTypes) => {
  const TemplateList = sequelize.define('TemplateList', {
    userId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    listID: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {});
  TemplateList.associate = function(models) {
    // associations can be defined here
  };
  return TemplateList;
};