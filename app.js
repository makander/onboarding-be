require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const schedule = require('node-schedule');

const messageTemplates = require('./utils/messages');
const emailService = require('./services/emailService');
const slackService = require('./services/slackService');
const listService = require('./services/listService');

const app = express();

const routes = require('./routes');
require('./config/passport')(passport);

const allowedOrigins = [
  'http://localhost:3000',
  'https://border-fe.herokuapp.com',
  'https://border-fe.netlify.app',
  'https://border-fe.netlify.app/',
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

  if (error.name === 'SequelizeValidationError') {
    return response.status(400).send(error);
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    if (error.original.code === 'ER_DUP_ENTRY') {
      return response.status(400).send(error);
    }

    return response.status(400).send('something went wrong');
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

schedule.scheduleJob('0 5 * * *', async () => {
  try {
    console.log('---------');
    console.log('Starting cron job');
    console.log('---------');
    const recepient = await emailService.findOne();
    const slack = await slackService.findOne();
    const lists = await listService.findAllNotCompleted();

    if (recepient != null) {
      console.log('---------');
      console.log('Sending notification mail');
      console.log('---------');
      await lists.forEach((list) => {
        const emailmsg = messageTemplates.scheduleEmail(
          list.name,
          recepient.email,
          list.date
        );

        emailService.send(emailmsg);
      });
    }

    if (slack != null) {
      await lists.forEach((list) => {
        console.log('---------');
        console.log('Sending slack message');
        console.log('---------');
        const notComp = messageTemplates.notCompleteNotification(
          list.name,
          list.date
        );
        slackService.send(notComp);
      });
    }
  } catch (e) {
    console.log(e);
  }
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/', routes);
app.use(errorHandler);
module.exports = app;
