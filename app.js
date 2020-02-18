require('dotenv').config();
const express = require('express');

const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const routes = require('./routes');
require('./config/passport')(passport);

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET }));

app.use(passport.initialize());
app.use(passport.session());


app.use('/', routes);
module.exports = app;
