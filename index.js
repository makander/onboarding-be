const chalk = require('chalk');
const app = require('./app');

app.listen(process.env.PORT || 5000, () => {
  console.log(chalk.red.bold('Onboarding BE is online'));
});
