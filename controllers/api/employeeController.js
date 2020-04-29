/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();
const employeeService = require('../../services/employeeService');
const emailService = require('../../services/emailService');
const messageTemplates = require('../../utils/messages');
const slackService = require('../../services/slackService');

router.post('/', async (req, res, next) => {
  try {
    const newList = await employeeService.create(req.body);
    res.send(newList);

    const recepient = await emailService.findOne();
    if (recepient) {
      const email = await messageTemplates.createListEmail(
        newList.name,
        recepient.email
      );
      await emailService.send(email);
    }
    const message = await messageTemplates.createListMessage(newList.name);
    await slackService.send(message);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
