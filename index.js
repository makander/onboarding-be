const chalk = require('chalk');
const app = require('./app');
const models = require('./models');

models.sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(chalk.red.bold('Onboarding BE is online'));
    });
  })
  .catch((error) => console.log(error));
