const express = require('express');

const taskService = require('../../../services/TaskService');

const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => taskService.list(req, res));
router.post('/', (req, res) => taskService.create(req, res));
router.delete('/:id', (req, res) => taskService.destroy(req, res));
router.put('/:id', (req, res) => taskService.update(req, res));
router.get('/:id', (req, res) => taskService.get(req, res));

module.exports = router;
