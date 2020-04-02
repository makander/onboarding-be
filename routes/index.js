const express = require('express');
const passport = require('passport');

const router = express.Router();

const userController = require('../controllers/api/userController');
const taskController = require('../controllers/api/taskController');
const departmentController = require('../controllers/api/departmentController');
const listController = require('../controllers/api/listController');
const employeeController = require('../controllers/api/employeeController');

router.use('/user', userController);

router.use(
  '/task',
  passport.authenticate('jwt', { session: false, assignProperty: 'userId' }),
  taskController
);

router.use(
  '/department',
  passport.authenticate('jwt', { session: false, assignProperty: 'userId' }),
  departmentController
);

router.use(
  '/list',
  passport.authenticate('jwt', { session: false, assignProperty: 'userId' }),
  listController
);

// router.use('/list/:id/task', taskController);

router.use(
  '/employee',
  passport.authenticate('jwt', { session: false, assignProperty: 'userId' }),
  employeeController
);

// router.use('/departments', departmentController);

module.exports = router;
