require('dotenv').config();
const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const routes = require('./routes');

require('./config/passport')(passport);

const app = express();

/* app.use(bodyParser.urlencoded({
  extended: true,
})); */

app.use(bodyParser.json());
app.use(cookieParser());

app.use(passport.initialize());


app.use('/', routes);
module.exports = app;
