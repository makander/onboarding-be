
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    title: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    notes: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    office: DataTypes.STRING,
    // listId: DataTypes.INTEGER,
  }, {});
  Employee.associate = function (models) {
    // associations can be defined here
    Employee.belongsTo(models.List);
  };
  return Employee;
};
