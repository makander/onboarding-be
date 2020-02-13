const express = require('express');
const userService = require('../../../services/UserService');

const router = express.Router();

router.post('/register', (req, res) => {
  // console.log(req);
  userService.create(req, res);
});

module.exports = router;
