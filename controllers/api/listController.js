const express = require('express');
const messageService = require('../../services/messageService');
const messageTemplates = require('../../utils/messages');

const router = express.Router();
const listService = require('../../services/listService');

router.post('/', async (req, res, next) => {
  try {
    const newList = await listService.create(req.body);
    res.json(newList);
    const message = messageTemplates.createListMessage(newList.name);
    const email = messageTemplates.createListEmail(newList.name);
    await messageService.sendMessage(message);
    await messageService.sendEmail(email);
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
      const message = messageTemplates.updateListStatusMessage(list.name);
      const email = messageTemplates.updateListStatusEmail(list.name);

      await messageService.sendEmail(email);
      await messageService.sendMessage(message);
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
