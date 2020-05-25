const express = require('express');

const emailService = require('../../services/emailService');
const slackService = require('../../services/slackService');

const router = express.Router();

router.post('/email', async (req, res, next) => {
  try {
    const newClient = await emailService.create(req.body.email);

    res.send(newClient);
  } catch (e) {
    next(e);
  }
});

router.get('/email', async (req, res, next) => {
  try {
    const emails = await emailService.findAll();
    res.send(emails);
  } catch (e) {
    next(e);
  }
});

router.post('/slack', async (req, res, next) => {
  try {
    const newClient = await slackService.create(req.body);
    res.send(newClient);
  } catch (e) {
    next(e);
  }
});

router.put('/email/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await emailService.update(id, status);
    res.send(updated);
  } catch (e) {
    next(e);
  }
});

router.delete('/email/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await emailService.destroy(id);
    res.status(200).send('service deleted');
  } catch (e) {
    next(e);
  }
});

router.get('/slack', async (req, res, next) => {
  try {
    const allSlack = await slackService.findAll();

    res.send(allSlack);
  } catch (e) {
    next(e);
  }
});

router.put('/slack/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await slackService.update(id, status);
    res.send(updated);
  } catch (e) {
    next(e);
  }
});

router.delete('/slack/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await slackService.destroy(id);
    res.status(200).send('User deleted');
  } catch (e) {
    next(e);
  }
});

module.exports = router;
