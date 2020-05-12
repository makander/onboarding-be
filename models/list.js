module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    description: DataTypes.TEXT,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 32],
        isUnique(value) {
          return List.findOne({ where: { name: value } }).then((name) => {
            if (name) {
              throw new Error('A list with that name already exists');
            }
          });
        },
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
    date: {
      type: DataTypes.DATE,
      defaultValue: null,
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
