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
          isUnique(value) {
            return Department.findOne({ where: { name: value } }).then(
              (name) => {
                if (name) {
                  throw new Error('A department with that name already exists');
                }
              }
            );
          },
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
