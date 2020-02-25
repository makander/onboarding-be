
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Employees', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    phoneNumber: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    notes: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    listId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Lists',
        key: 'id',
      },
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Employees'),
};
