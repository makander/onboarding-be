require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cron = require('node-cron');

const messageTemplates = require('./utils/messages');
const emailService = require('./services/emailService');
const slackClient = require('./services/slackService');
const listService = require('./services/listService');

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

cron.schedule('0 3 * * *', async () => {
  try {
    console.log('---------');
    console.log('Starting cron job');
    console.log('---------');
    const recepient = await emailService.findOne();
    const slack = await slackClient.findOne();

    if (recepient || slack) {
      const lists = await listService.findAllNotCompleted();

      if (lists.length) {
        // currently doing most notficiations by email so disabling slack reminders for now 
        console.log('Sending notification mail');
        lists.forEach(async (list) => {
          const emailmsg = messageTemplates.scheduleEmail(
            list.name,
            recepient.email,
            list.startDate
          );

          await emailService.send(emailmsg);
        });
      }
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
