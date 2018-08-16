const router = require('express').Router();

router.get('/', (req, res) => {
  res
    .status(200)
    .send('Todos route works!');
});

module.exports = router;
