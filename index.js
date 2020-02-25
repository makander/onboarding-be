const chalk = require('chalk');
const app = require('./app');
const models = require('./models');


const mockUser = [{
  firstName: 'Kalle',
  lastName: 'Svensson',
  password: 'test',
  email: 'kalle@svensson.se',
}, {
  firstName: 'Göran',
  lastName: 'Svensson',
  password: 'test',
  email: 'göran@svensson.se',
}];

const mockTask = [{
  firstName: 'Kalle',
  lastName: 'Svensson',
  password: 'test',
  email: 'kalle@svensson.se',
}, {
  firstName: 'Göran',
  lastName: 'Svensson',
  password: 'test',
  email: 'göran@svensson.se',
}];

const mockDepartment = [{
  firstName: 'Kalle',
  lastName: 'Svensson',
  password: 'test',
  email: 'kalle@svensson.se',
}, {
  firstName: 'Göran',
  lastName: 'Svensson',
  password: 'test',
  email: 'göran@svensson.se',
}];

models.sequelize.sync({ force: true }).then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(chalk.red.bold('Onboarding BE is online'));
  }).then((mockUser.forEach((user) => {
    models.User.create(user);
  })
  ));
})
  .catch((error) => console.log(error));
