require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Sequelize = require('sequelize');
const routes = require('./routes');

const app = express();

const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB}`);

sequelize.authenticate().then(() => { console.log('connected'); })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/', routes);
module.exports = app;
