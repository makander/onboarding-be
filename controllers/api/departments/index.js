const express = require('express');
const { User } = require('../../../models/');
const { Department } = require('../../../models/');

const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  Department.findAll({}).then((data) => {
    res.json(data);
  });
});

router.post('/', (req, res) => {
  const deparmentProps = req.body;

  Department.create({ deparmentProps }).then((data) => res.json(data));
});

module.exports = router;
