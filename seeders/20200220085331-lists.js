
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Lists', [{
    name: 'Onboarding',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: false,
    departmentId: 1,
  },
  {
    name: 'Offboarding',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: false,
    departmentId: 2,
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
