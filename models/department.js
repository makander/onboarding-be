module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define(
    'Department',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: 2,
        },
      },
    },
    {}
  );
  Department.associate = function (models) {
    Department.belongsToMany(
      models.User,
      { through: 'UserDepartment' },
      { onUpdate: 'CASCADE' }
    );
    Department.belongsToMany(
      models.List,
      { through: 'DepartmentList' },
      { onUpdate: 'CASCADE' }
    );
  };
  return Department;
};
