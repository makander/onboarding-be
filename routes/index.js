const express = require('express');

const router = express.Router();

const userController = require('../controllers/api/users');
const taskController = require('../controllers/api/tasks');
const departmentController = require('../controllers/api/departments');
const listController = require('../controllers/api/lists');


router.use('/api/user/', userController);
router.use('/api/user/:id/task', taskController);
router.use('/api/user/:id/department', departmentController);
router.use('/api/user/:id/list', listController);


module.exports = router;
