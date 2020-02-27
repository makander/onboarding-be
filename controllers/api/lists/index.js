const express = require('express');

const listService = require('../../../services/ListService');

const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => listService.list(req, res));
router.post('/', (req, res) => listService.create(req, res));
router.delete('/:id', (req, res) => listService.destroy(req, res));
router.put('/:id', (req, res) => listService.update(req, res));
router.get('/:id', (req, res) => listService.get(req, res));

module.exports = router;
