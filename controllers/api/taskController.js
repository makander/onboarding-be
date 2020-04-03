const express = require('express');

const router = express.Router();
const taskService = require('../../services/taskService');

router.post('/', async (req, res) => {
  try {
    const task = await taskService.create(req.body);
    res.json(task);
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
    const updated = await taskService.update(req.params, req.body);
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
