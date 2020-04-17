module.exports = (sequelize, DataTypes) => {
  const UserDepartment = sequelize.define(
    'UserDepartment',
    {
      UserId: DataTypes.INTEGER,
      DepartmentId: DataTypes.INTEGER,
    },
    {}
  );
  UserDepartment.associate = function (models) {};
  return UserDepartment;
};
