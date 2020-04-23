const app = require('./app');
const models = require('./models');

models.sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log('Onboarding BE is online');
    });
  })
  .catch((error) => console.log(error));
