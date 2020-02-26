const express = require('express');
const { User } = require('../../../models/');
const { List } = require('../../../models/');

const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  // res.send('on the user task route');
  // User.findOne({ where: { id } });
  // res.send('on task controller again');
  const { id } = req.params;
  // console.log(req.params);
  User.findAll({
    include: [{
      model: List,
      // attributes: ['id', 'name'],
    }],
    where: { id },
  }).then((data) => res.json(data));
});

module.exports = router;
