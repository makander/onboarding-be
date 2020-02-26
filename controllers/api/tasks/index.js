const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { User } = require('../../../models/');
const { Task } = require('../../../models/');

const router = express.Router({ mergeParams: true });


router.post('/tasks', (req, res) => {
  // res.send('on the user task route');
  // User.findOne({ where: { id } });
  res.send('on task controller again');
  const { id } = req.params;
  console.log(req.params);
  User.findAll({
    include: [{
      model: Task,
      attributes: ['id', 'name'],
    }],
    where: { id },
  });
});

const getTasks = () => { };

const getTask = () => {};

const getLists = () => {

};

const getList = () => {};

module.exports = router;
