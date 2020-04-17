const express = require('express');

const router = express.Router();
const departmentService = require('../../services/departmentService');

/* router.post('/', async (req, res) => {
  try {
    const newDepartment = await departmentService.create(req.body);
    res.json(newDepartment);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const departments = await departmentService.findAll();
    res.json(departments);
  } catch (e) {
    console.log(e);

    res.status(500).send({ message: e.message });
  }
});

router.get('/lists', async (req, res) => {
  try {
    const departmentLists = await departmentService.findAllLists(req.user.id);
    res.send(departmentLists);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const department = await departmentService.findOne(req.params);
    res.json(department);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

router.get('/tasks', async (req, res) => {
  try {
    const departmentTasks = await departmentService.findAllTasks(req.params);
    res.json(departmentTasks);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedDepartment = await departmentService.update(
      req.params,
      req.body
    );
    res.json(updatedDepartment);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await departmentService.destroy(req.params);
    res.status(200).send('Deparment deleted');
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

router.delete('/:id/user', async (req, res) => {
  try {
    const removedUser = await departmentService.removeUser(
      req.params,
      req.body
    );
    res.json(removedUser);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
}); */

router.post('/', (req, res) => {
  console.log(req);
  res.json('SLACK BOT IS ONLINE BABY');
});

module.exports = router;
