
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    name: DataTypes.STRING,
    state: DataTypes.BOOLEAN,
  }, {});
  List.associate = function (models) {
    // associations can be defined here
  };
  return List;
};
