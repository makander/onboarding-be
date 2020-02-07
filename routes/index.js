const express = require('express');

const router = express.Router();

const userController = require('../controllers/api/users');

router.use('/api/users', userController);

module.exports = router;
