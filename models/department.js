module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define(
    'Department',
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          allowNull: false,
          notEmpty: true,
          len: 2,
        },
      },
      // userId: DataTypes.INTEGER,
      // listId: DataTypes.INTEGER,
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
