// import Express from 'express'
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes');


const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(port, '/', routes);

module.exports = app;
