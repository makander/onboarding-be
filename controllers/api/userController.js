const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const userService = require('../../services/userService');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    await userService.create(req.body);
    res.status(200).send('user created');
  } catch (e) {
    next(e);
    // res.status(500).send({ message: e.message });
  }
});

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res, next) => {
    try {
      const { user } = req;
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      res.cookie('borderToken', token, {
        maxAge: new Date(Date.now() + 43200000),
        httpOnly: true,
      });
      res.send({ success: true, user });
    } catch (e) {
      next(e);
      // res.status(500).send({ message: e.message });
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.findOne(id);
      res.send(user);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const allUsers = await userService.all();
      res.send(allUsers);
    } catch (e) {
      next(e);
    }
  }
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedUser = await userService.update(id, data);
      res.send(updatedUser);
    } catch (e) {
      next(e);
    }
  }
);

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await userService.destroy(id);
    res.status(200).send('User deleted');
  } catch (e) {
    next(e);
  }
});

router.post('/logout', async (req, res, next) => {
  try {
    res.clearCookie('borderToken', {
      maxAge: new Date(Date.now() + 43200000),
      httpOnly: true,
    });
    return res.status(200).end();
  } catch (e) {
    next(e);
  }
});
module.exports = router;
