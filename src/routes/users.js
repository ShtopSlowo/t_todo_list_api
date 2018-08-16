const router = require('express').Router();

const { userControler } = require('../controlers');

router.route('/')
  .get(userControler.getAllUsers)
  .post();
router.post('/login');

module.exports = router;
