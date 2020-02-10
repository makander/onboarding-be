// import Express from 'express'
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes');


const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/', routes);
module.exports = app;
