
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: DataTypes.STRING,
    // userId: DataTypes.INTEGER,
    // listId: DataTypes.INTEGER,
  }, {});
  Department.associate = function (models) {
    Department.belongsToMany(models.User, { through: 'UserDepartment' });
    Department.belongsToMany(models.List, { through: 'DepartmentList' });
  };
  return Department;
};
