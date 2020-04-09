module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    title: {
      type: DataTypes.STRING,
      validation: {
        allowNull: false,
        notEmpty: true,
        min: 2,
      },
    },
    email: {
      type: DataTypes.STRING,
      validation: {
        allowNull: false,
        notEmpty: true,
        isEmail: true,
      },
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    notes: DataTypes.STRING,
    firstName: {
      type: DataTypes.STRING,
      validation: {
        allowNull: false,
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      validation: {
        allowNull: false,
        notEmpty: true,
      },
    },
    office: {
      type: DataTypes.STRING,
      validation: {
        allowNull: false,
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
