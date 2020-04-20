const express = require('express');
const messageService = require('../../services/messageService');
const userService = require('../../services/userService');
const listService = require('../../services/listService');
const messageTemplates = require('../../utils/messages');

const router = express.Router();
const taskService = require('../../services/taskService');

router.post('/', async (req, res, next) => {
  try {
    const task = await taskService.create(req.body);

    const list = await listService.findOne({ id: req.body.ListId });
    const listWTask = await listService.findOne({ id: req.body.ListId });
    res.json(listWTask);

    if (!list.templateList) {
      const message = messageTemplates.createTaskMessasge(task.name, list.name);
      await messageService.sendMessage(message);

      const email = messageTemplates.createTaskEmail(task.name, list.name);
      await messageService.sendEmail(email);
    }
  } catch (e) {
    next(e);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const tasks = await taskService.findAll();
    res.json(tasks);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const task = await taskService.findOne(req.params);
    res.send(task);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const department = await taskService.findOne(req.params);
    res.json(department);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { userId, status } = req.body;

    const updated = await taskService.update(req.params, req.body);
    res.json(updated);

    if (userId != null) {
      const user = await userService.findOne(userId);
      const list = await listService.findOne({ id: updated.ListId });
      const message = messageTemplates.updateTaskUserMessage(
        user.firstName,
        user.lastName,
        updated.name,
        list.name
      );
      await messageService.sendMessage(message);

      const email = messageTemplates.updateTaskUserEmail(
        user.firstName,
        user.lastName,
        updated.name,
        list.name
      );
      await messageService.sendEmail(email);
    }

    if (status) {
      const task = await taskService.findOne(req.params);
      const list = await listService.findOne({ id: task.ListId });
      const message = messageTemplates.updateTaskStatusMessage(
        task.name,
        list.name
      );
      const email = messageTemplates.updateTaskStatusEmail(
        task.name,
        list.name
      );

      await messageService.sendEmail(email);
      await messageService.sendMessage(message);
    }
  } catch (e) {
    next(e);
  }
});

router.delete('/:id/user', async (req, res, next) => {
  try {
    await taskService.destroy(req.params);
    res.status(200).send('Task deleted');
  } catch (e) {
    next(e);
  }
});

module.exports = router;
