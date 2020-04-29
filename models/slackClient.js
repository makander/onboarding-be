module.exports = (sequelize, DataTypes) => {
  const SlackClient = sequelize.define('SlackClient', {
    slackUri: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
  return SlackClient;
};
