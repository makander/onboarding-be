const express = require('express');

const router = express.Router();

const userController = require('../controllers/api/users');
const taskController = require('../controllers/api/tasks');

router.use('/api/user/', userController);
router.use('/api/user/:id', taskController);

module.exports = router;
