/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();
const employeeService = require('../../services/employeeService');
const messageService = require('../../services/messageService');
const messageTemplates = require('../../utils/messages');

router.post('/', async (req, res, next) => {
  try {
    const newEmployeeList = await employeeService.create(req.body);
    const message = messageTemplates.createListEmail(newEmployeeList.name);
    const slackMesasge = messageTemplates.createListMessage(
      newEmployeeList.name
    );
    await messageService.sendMessage(slackMesasge);
    await messageService.sendEmail(message);
    res.send(newEmployeeList);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
