const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const userService = require('../../services/userService');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    await userService.create(req.body);
    res.status(200).send('user created');
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    try {
      const { user } = req;
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      res.cookie('borderToken', token, {
        maxAge: new Date(Date.now() + 43200000),
        httpOnly: true,
      });
      res.send({ success: true, user });
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userService.findOne(id);
      res.send(user);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const allUsers = await userService.all();
      res.send(allUsers);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedUser = await userService.update(id, data);
      res.send(updatedUser);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }
);

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await userService.destroy(id);
    res.status(200).send('User deleted');
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = router;
