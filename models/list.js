module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    description: DataTypes.TEXT,
    name: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false,
        notEmpty: true,
        min: 2,
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    templateList: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  List.associate = function (models) {
    // associations can be defined here
    List.hasOne(models.Employee, { onDelete: 'CASCADE', hooks: true });
    List.belongsToMany(models.Department, { through: 'DepartmentList' });
    List.belongsToMany(models.User, { through: 'UserList' });
    List.hasMany(models.Task, {
      onDelete: 'CASCADE',
      hooks: true,
    });
  };
  return List;
};
