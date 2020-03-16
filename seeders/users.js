
module.exports = {
  up: (queryInterface, Sequelize) =>

  /*  Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      role: DataTypes.ENUM('Admin', 'Guest'),
      departmentId: DataTypes.INTEGER,
       taskId: DataTypes.INTEGER,
      listId: DataTypes.INTEGER,
    },
 */
    queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      password: 'test',
      email: 'john@doe.com',
      createdAt: new Date(),
      updatedAt: new Date(),

    }, {
      firstName: 'Lisa',
      lastName: 'Svensson',
      password: 'test',
      email: 'Lisa@Svensson.com',
      createdAt: new Date(),
      updatedAt: new Date(),


    }, {
      firstName: 'Brue',
      lastName: 'Lee',
      password: 'test',
      email: 'ninja@nunchuck.com',
      createdAt: new Date(),
      updatedAt: new Date(),

    }, {
      firstName: 'Anna',
      lastName: 'Karlsson',
      password: 'test',
      email: 'Anna@Karlsson.com',
      createdAt: new Date(),
      updatedAt: new Date(),


    }, {
      firstName: 'Fred',
      lastName: 'Bellinder',
      password: 'test',
      email: 'fred@semla.com',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),


    }], {}),


  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('People', null, {}),
};
