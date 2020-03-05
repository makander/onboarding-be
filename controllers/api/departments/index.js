const express = require('express');

const departmentService = require('../../../services/DepartmentService');

const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => departmentService.list(req, res));
router.post('/', (req, res) => departmentService.create(req, res));
router.delete('/:id', (req, res) => departmentService.destroy(req, res));
router.put('/:id', (req, res) => departmentService.update(req, res));
router.get('/:id', (req, res) => departmentService.get(req, res));

module.exports = router;
