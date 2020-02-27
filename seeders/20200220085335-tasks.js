
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Tasks', [{
    name: 'Lägg till i ekonomisystemet',
    status: false,
    description: 'Glöm inte bort och lägg till Kalle till Marathon, han börjar på tisdag.',
    createdAt: new Date(),
    updatedAt: new Date(),

  }, {
    name: 'Boka blommor och tårta',
    status: false,
    description: 'Glöm inte att beställa en tårta till Kalle',
    createdAt: new Date(),
    updatedAt: new Date(),
    ListId: 1,
    UserId: 1,
  },
  {
    name: 'Beställ dator',
    status: false,
    description: 'Beställ en dator',
    createdAt: new Date(),
    updatedAt: new Date(),
    ListId: 2,
  },
  {
    name: 'Radera dator',
    status: false,
    description: 'Kasta allt på datorn.',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    name: 'Städa skrivbordet',
    status: false,
    description: 'Städa skrivbordet som Kalle ska sitta på, det finns på plan 4:a',
    createdAt: new Date(),
    updatedAt: new Date(),
    ListId: 1,
    UserId: 1,
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Tasks', null, {}),
};
