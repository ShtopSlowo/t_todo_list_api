const router = require('express').Router();

const { userControler } = require('../controlers');

router.route('/')
  .get(userControler.getAllUsers)
  .post(userControler.createUser);

router.route('/:id')
  .get(userControler.getUser);

module.exports = router;
