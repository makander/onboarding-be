const express = require('express');
const passport = require('passport');

const router = express.Router();

const userController = require('../controllers/api/users');
const taskController = require('../controllers/api/tasks');
const departmentController = require('../controllers/api/departments');
const listController = require('../controllers/api/lists');

router.use('/api/user', userController);

router.use('/api/task', passport.authenticate('jwt', { session: false, assignProperty: 'userId' }), taskController);

router.use('/api/department', passport.authenticate('jwt', { session: false, assignProperty: 'userId' }), departmentController);

router.use('/api/list', passport.authenticate('jwt', { session: false, assignProperty: 'userId' }), listController);

router.use('/api/list/:id/task', taskController);

// router.use('/api/departments', departmentController);


module.exports = router;
