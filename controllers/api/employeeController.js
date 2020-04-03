/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();
const employeeService = require('../../services/employeeService');

router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const newEmployeeList = await employeeService.create(req.body);
    res.send(newEmployeeList);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

module.exports = router;
