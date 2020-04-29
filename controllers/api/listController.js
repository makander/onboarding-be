const express = require('express');
const emailService = require('../../services/emailService');
const messageTemplates = require('../../utils/messages');
const slackService = require('../../services/slackService');

const router = express.Router();
const listService = require('../../services/listService');

router.post('/', async (req, res, next) => {
  try {
    const newList = await listService.create(req.body);
    res.json(newList);

    const recepient = await emailService.findOne();
    const message = messageTemplates.createListMessage(newList.name);
    const email = messageTemplates.createListEmail(
      newList.name,
      recepient.email
    );
    await slackService.send(message);
    await emailService.send(email);
  } catch (e) {
    next(e);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const allLists = await listService.all();
    res.json(allLists);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const list = await listService.findOne(req.params);
    res.json(list);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updated = await listService.update(req.params, req.body);
    res.json(updated);

    if (req.body.status) {
      const list = await listService.findOne(req.params);

      const recepient = await emailService.findOne();

      if (recepient) {
        const email = messageTemplates.updateListStatusEmail(
          list.name,
          recepient.email
        );
        await emailService.send(email);
      }
      const message = messageTemplates.updateListStatusMessage(list.name);
      await slackService.send(message);
    }
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await listService.destroy(req.params);
    res.status(200).send('List deleted');
  } catch (e) {
    next(e);
  }
});

module.exports = router;
