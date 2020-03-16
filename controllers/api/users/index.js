const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const userService = require('../../../services/UserService');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    await userService.create(req.body);
    res.status(200).send('user created');
  } catch (error) {
    console.log(error);
    // res.error(error);
  }
});

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    try {
      const user = {
        id: req.user.id,
        userName: req.user.email,
        role: req.user.role,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
      };
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      res.cookie('borderToken', token, {
        maxAge: new Date(Date.now() + 43200000),
        httpOnly: true,
      });
      res.send({ success: true, user });
    } catch (error) {
      console.log(error);
      // res.error(error);
    }
  },
);

router.get(
  ':id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json('authenticated');
  },
);

router.get(
  '/list', // Borde heta all
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
    const allUsers = await userService.findAll();
    res.send(allUsers);
    } catch (error) {
      console.log(error);
      // res.error(error);
    }
  },
);


router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await userService.findOne(id);
      const updatedUser = {...user, ...body};
      await auserService.update(updatedUser);
      res.send(updatedUser);
    } catch (error) {
      console.log(error);
      // res.error(error);
    }
    
  },
);

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await userService.delete(id);
    res.status(200).send('User deleted');
  } catch (error) {
    console.log(error);
    // res.error(error);
  }
});

module.exports = router;
