
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Departments', [
    {
      name: 'Ekonomi',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'IT',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {}),

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
