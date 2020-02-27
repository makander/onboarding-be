
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    description: DataTypes.TEXT,
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    departmentId: DataTypes.INTEGER,
  }, {});
  List.associate = function (models) {
    // associations can be defined here
    List.hasOne(models.Employee, { foreginKey: 'listId' });
    List.belongsToMany(models.Department, { through: 'DepartmentList' });
    List.belongsToMany(models.User, { through: 'UserList' });
    List.hasMany(models.Task, { foreginKey: 'listId' });
  };
  return List;
};