const express = require('express');

const router = express.Router();
const departmentService = require('../../services/departmentService');

router.post('/', async (req, res, next) => {
  try {
    const newDepartment = await departmentService.create(req.body);
    res.json(newDepartment);
  } catch (e) {
    next(e);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const departments = await departmentService.findAll();
    res.json(departments);
  } catch (e) {
    next(e);
  }
});

router.get('/lists', async (req, res, next) => {
  try {
    const departmentLists = await departmentService.findAllLists(req.user.id);
    res.send(departmentLists);
  } catch (e) {
    next(e);
  }
});
router.get('/:id', async (req, res, next) => {
  try {
    const department = await departmentService.findOne(req.params);
    res.json(department);
  } catch (e) {
    next(e);
  }
});

/* router.get('/tasks', async (req, res, next) => {
  try {
    const departmentTasks = await departmentService.findAllTasks(req.params);
    res.json(departmentTasks);
  } catch (e) {
    next(e);
  }
}); */

router.put('/:id', async (req, res, next) => {
  try {
    const updatedDepartment = await departmentService.update(
      req.params,
      req.body
    );
    res.json(updatedDepartment);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await departmentService.destroy(req.params);
    res.status(200).send('Deparment deleted');
  } catch (e) {
    next(e);
  }
});

router.delete('/:id/user', async (req, res, next) => {
  try {
    const removedUser = await departmentService.removeUser(
      req.params,
      req.body
    );
    res.json(removedUser);
  } catch (e) {
    next(e);
  }
});
module.exports = router;
