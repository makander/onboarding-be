/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();
const employeeService = require('../../services/employeeService');
const messagingService = require('../../services/messagingService');

router.post('/', async (req, res) => {
  try {
    const newEmployeeList = await employeeService.create(req.body);
    const message = `A new :clipboard: ${newEmployeeList.name} list has been created`;
    await messagingService.sendMessage(message);
    res.send(newEmployeeList);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

module.exports = router;
