const express = require('express');
const userService = require('../../../services/UserService');

const router = express.Router();

router.post('/register', (req, res) => {
  // console.log(req);
  userService.create(req, res);
});

router.post('/login', (req, res) => {
  userService.get(req, res);
});

router.put('/update/:id', (req, res) => {
  userService.update(req, res);
});

router.delete('/delete/:id', (req, res) => {
  userService.destroy(req, res);
});

module.exports = router;
