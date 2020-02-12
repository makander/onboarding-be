
const Sequelize = require('sequelize');
const db = require('../services/Database/');

const User = db.define('user', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
});

module.exports = User;
