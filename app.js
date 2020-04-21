require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const app = express();

const routes = require('./routes');
require('./config/passport')(passport);

const allowedOrigins = [
  'http://localhost:3000',
  'https://border-fe.herokuapp.com',
  'https://border-fe.netlify.app',
];

app.use(morgan('tiny', ':type[req]'));
morgan.token('type', (req, res) => req.headers['content-type']);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformed id' });
  }
  if (error.name === 'ValidationError:') {
    return response.status(400).toJSON({ error: error.message });
  }

  return next(error);
};

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const message =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },

    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/', routes);
app.use(errorHandler);
module.exports = app;
