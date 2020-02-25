
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Tasks', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    description: {
      type: Sequelize.TEXT,
    },
    status: {
      type: Sequelize.BOOLEAN,
    },
    name: {
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
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    listId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Lists',
        key: 'id',
      },
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Tasks'),
};
