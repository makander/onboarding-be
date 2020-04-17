const express = require('express');
const messagingService = require('../../services/messagingService');
const userService = require('../../services/userService');
const listService = require('../../services/listService');

const router = express.Router();
const taskService = require('../../services/taskService');

router.post('/', async (req, res) => {
  try {
    const task = await taskService.create(req.body);

    const list = await listService.findOne({ id: req.body.ListId });
    if (!list.templateList) {
      const message = `${task.name} has been created in :clipboard: ${list.name}`;
      await messagingService.sendMessage(message);
    }
    const listWTask = await listService.findOne({ id: req.body.ListId });
    res.json(listWTask);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const tasks = await taskService.findAll();
    res.json(tasks);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const task = await taskService.findOne(req.params);
    res.send(task);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const department = await taskService.findOne(req.params);
    res.json(department);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { userId, status } = req.body;

    const updated = await taskService.update(req.params, req.body);

    if (userId != null) {
      const user = await userService.findOne(userId);
      const list = await listService.findOne({ id: updated.ListId });
      const message = `:raising_hand: ${user.firstName} ${user.lastName} has been assigned to ${updated.name} in :clipboard: ${list.name} `;
      await messagingService.sendMessage(message);
    }

    if (status) {
      const task = await taskService.findOne(req.params);
      const list = await listService.findOne({ id: task.ListId });
      const message = `${task.name} in :clipboard: ${list.name} is :heavy_check_mark:`;
      await messagingService.sendMessage(message);
    }

    res.json(updated);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

router.delete('/:id/user', async (req, res) => {
  try {
    await taskService.destroy(req.params);
    res.status(200).send('Task deleted');
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

module.exports = router;
