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
        signed: true,
      });

      const usr = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        admin: user.admin,
      };

      res.send({ success: true, usr });
    } catch (e) {
      next(e);
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

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await userService.destroy(id);
      res.status(200).send('User deleted');
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      res.clearCookie('borderToken', {
        maxAge: 0,
        httpOnly: true,
      });
      res.status(200).end();
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  '/refresh',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      console.log(req);
      const {
        user: { id },
      } = req;
      const user = await userService.findOne(id);

      const usr = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        admin: user.admin,
      };

      res.send({ success: true, usr });
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
