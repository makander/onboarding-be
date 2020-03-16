
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('DepartmentLists', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    DepartmentId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Departments',
        key: 'id',
      },
    },
    ListId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Lists',
        key: 'id',
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('DepartmentLists'),
};
