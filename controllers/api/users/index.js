const express = require('express');
const passport = require('passport');
const chalk = require('chalk');
const userService = require('../../../services/UserService');

const router = express.Router();

router.post('/register', (req, res) => {
  userService.create(req, res);
});

router.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    res.json(
      req.user.email,
      req.user.role,
      req.user.firstName,
    );
  });

router.put('/update/:id', (req, res) => {
  userService.update(req, res);
});

router.delete('/delete/:id', (req, res) => {
  userService.destroy(req, res);
});

module.exports = router;
