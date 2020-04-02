const express = require('express');
const passport = require('passport');
const path = require('path');

const router = express.Router();

const userController = require('../controllers/api/userController');
const taskController = require('../controllers/api/taskController');
const departmentController = require('../controllers/api/departmentController');
const listController = require('../controllers/api/listController');
const employeeController = require('../controllers/api/employeeController');

router.use('/*', express.static(path.join(__dirname, 'build')));

router.use('/api/user', userController);

router.use(
  '/api/task',
  passport.authenticate('jwt', { session: false, assignProperty: 'userId' }),
  taskController
);

router.use(
  '/api/department',
  passport.authenticate('jwt', { session: false, assignProperty: 'userId' }),
  departmentController
);

router.use(
  '/api/list',
  passport.authenticate('jwt', { session: false, assignProperty: 'userId' }),
  listController
);

// router.use('/api/list/:id/task', taskController);

router.use(
  '/api/employee',
  passport.authenticate('jwt', { session: false, assignProperty: 'userId' }),
  employeeController
);

// router.use('/api/departments', departmentController);

module.exports = router;
