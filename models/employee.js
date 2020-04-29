module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    notes: DataTypes.STRING,
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    office: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });
  Employee.associate = function (models) {
    // associations can be defined here
    Employee.belongsTo(models.List, {
      onDelete: 'CASCADE',
      hooks: true,
    });
  };
  return Employee;
};
