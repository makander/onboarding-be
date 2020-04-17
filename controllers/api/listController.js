const express = require('express');
const messagingService = require('../../services/messagingService');

const router = express.Router();
const listService = require('../../services/listService');

router.post('/', async (req, res) => {
  try {
    const newList = await listService.create(req.body);
    const message = `A new :clipboard: template ${newList.name} has been created`;
    await messagingService.sendMessage(message);
    res.json(newList);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const allLists = await listService.all();
    res.json(allLists);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const list = await listService.findOne(req.params);
    res.json(list);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await listService.update(req.params, req.body);
    res.json(updated);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await listService.destroy(req.params);
    res.status(200).send('List deleted');
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

module.exports = router;
