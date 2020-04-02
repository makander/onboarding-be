require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const path = require('path');
const routes = require('./routes');

require('./config/passport')(passport);

const allowedOrigins = ['http://localhost:3000'];

const app = express();

app.use(morgan('tiny', ':type[req]'));
morgan.token('type', (req, res) => req.headers['content-type']);
// app.use(morgan);
/* app.use(bodyParser.urlencoded({
  extended: true,
})); */

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },

    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

app.use(passport.initialize());
app.use('/', express.static(path.join(__dirname, 'build')));
app.use('/api', routes);
module.exports = app;
