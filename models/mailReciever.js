module.exports = (sequelize, DataTypes) => {
  const MailReceiver = sequelize.define('MailReceiver', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  return MailReceiver;
};
