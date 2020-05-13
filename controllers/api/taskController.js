const express = require('express');
const emailService = require('../../services/emailService');
const messageTemplates = require('../../utils/messages');
const slackService = require('../../services/slackService');
const userService = require('../../services/userService');
const listService = require('../../services/listService');

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
      await slackService.send(message);

      const recepient = await emailService.findOne();
      if (recepient) {
        const email = messageTemplates.createTaskEmail(
          task.name,
          list.name,
          recepient.email
        );
        await emailService.send(email);
      }
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
    const recepient = await emailService.findOne();

    if (userId != null) {
      const user = await userService.findOne(userId);
      const list = await listService.findOne({ id: updated.ListId });

      if (recepient) {
        const email = messageTemplates.updateTaskUserEmail(
          user.firstName,
          user.lastName,
          updated.name,
          list.name,
          recepient.email
        );
        await emailService.send(email);
      }

      const message = messageTemplates.updateTaskUserMessage(
        user.firstName,
        user.lastName,
        updated.name,
        list.name
      );
      await slackService.send(message);
    }

    if (status) {
      const task = await taskService.findOne(req.params);
      const list = await listService.findOne({ id: task.ListId });
      const message = messageTemplates.updateTaskStatusMessage(
        task.name,
        list.name
      );
      await slackService.send(message);

      if (recepient) {
        const email = messageTemplates.updateTaskStatusEmail(
          task.name,
          list.name,
          recepient.email
        );
        await emailService.send(email);
      }
    }
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await taskService.destroy(req.params);
    res.status(200).send('Task deleted');
  } catch (e) {
    next(e);
  }
});

/* router.delete('/:id', async (req, res, next) => {
  try {
    await taskService.de
  }
} */

module.exports = router;
