const chalk = require('chalk');
const app = require('./app');
const models = require('./models');

const mockUser = [
  {
    firstName: 'Kalle',
    lastName: 'Svensson',
    password: 'test',
    email: 'kalle@svensson.se',
    departmentId: 1,
  },
  {
    firstName: 'Göran',
    lastName: 'Svensson',
    password: 'test',
    email: 'göran@svensson.se',
    departmentId: 2,
  },
];

const mockTask = [
  {
    description: 'Gör nåt',
    status: false,
    name: 'Koka pasta',
    ListId: 2,
  },
  {
    description: 'Gör nåt igen',
    status: false,
    name: 'Dammsuga mattan',
    ListId: 1,
  },
];

const mockDepartment = [
  {
    name: 'IT',
  },
  {
    name: 'Ekonomi',
  },
];

const mockLists = [
  {
    description: 'här står det massa viktig info om det här arbetsflödet',
    name: 'Hushållsgöra',
    status: 'false',
    departmentId: 1,
  },
  {
    description: 'här står det massa viktig info om det här arbetsflödet',
    name: 'Offboarding',
    status: 'false',
    departmentId: 2,
  },
];

models.sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(chalk.red.bold('Onboarding BE is online'));
    });
  })/* .then(async () => {
    await mockUser.forEach((user) => {
      models.User.create(user);
    });

    await mockDepartment.forEach((department) => {
      models.Department.create(department);
    });

    await mockLists.forEach((list) => {
      models.List.create(list);
    });


    await mockTask.forEach((task) => {
      models.Task.create(task);
    });
  }) */
  .catch((error) => console.log(error));
