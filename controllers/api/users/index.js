const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const userService = require('../../../services/UserService');

const router = express.Router();

router.post('/register', (req, res) => {
  userService.create(req, res);
});

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    const returnedUser = {
      id: req.user.id,
      userName: req.user.email,
      role: req.user.role,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
    };
    const token = jwt.sign(req.user.id, process.env.JWT_SECRET);
    res.json({ success: true, token, returnedUser });
  },
);

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json('authenticated');
  },
);

router.put(
  '/update/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    userService.update(req, res);
  },
);

router.delete('/delete/:id', (req, res) => {
  userService.destroy(req, res);
});

module.exports = router;
