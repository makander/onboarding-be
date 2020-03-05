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
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET);
    // res.send({ success: true, returnedUser });

    // console.log(req.headers);

    res.cookie('borderToken', token, {
      maxAge: new Date(Date.now() + 43200000),
      httpOnly: true,
    });

    res.send({ success: true, returnedUser });
  },
);

router.get(
  '/profile/:id',
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
