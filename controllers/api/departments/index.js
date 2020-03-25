const express = require('express');

const departmentService = require('../../../services/DepartmentService');

const router = express.Router({ mergeParams: true });

router.get('/all', (req, res) => departmentService.findAll(req, res));
router.post('/', (req, res) => departmentService.create(req, res));
router.delete('/:id', (req, res) => departmentService.destroy(req, res));
router.put('/:id', (req, res) => departmentService.update(req, res));
router.delete('/:id/user', (req, res) => departmentService.removeUser(req, res));
router.get('/:id/tasks', (req, res) => departmentService.findAllDepartmentTasks(req, res));
router.get('/:id', (req, res) => departmentService.findOne(req, res));
router.get('/:id/list', (req, res) => departmentService.findAllDepartmentLists(req, res));

module.exports = router;
