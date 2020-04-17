const express = require('express');
const passport = require('passport');
const path = require('path');

const router = express.Router();

const userController = require('../controllers/api/userController');
const taskController = require('../controllers/api/taskController');
const departmentController = require('../controllers/api/departmentController');
const listController = require('../controllers/api/listController');
const employeeController = require('../controllers/api/employeeController');
const homeController = require('../controllers/homeController');
const slackController = require('../controllers/api/slackController');

// router.use('/', homeController);

router.use('/api/user', userController);

router.use(
  '/api/task',
  passport.authenticate('jwt', { session: false }),
  taskController
);

router.use(
  '/api/department',
  passport.authenticate('jwt', { session: false }),
  departmentController
);

router.use(
  '/api/list',
  passport.authenticate('jwt', { session: false }),
  listController
);

router.use('/api/slack', slackController);

// router.use('/api/list/:id/task', taskController);

router.use(
  '/api/employee',
  passport.authenticate('jwt', { session: false }),
  employeeController
);

// router.use('/api/departments', departmentController);

module.exports = router;
