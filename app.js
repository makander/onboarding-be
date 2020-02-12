require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const db = require('./services/Database');


const app = express();

db.authenticate().then(() => { console.log('connected'); })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


app.use(bodyParser.json());
app.use(cookieParser());
app.use('/', routes);
module.exports = app;
