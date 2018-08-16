const User = require('../models/User');

exports.getAllUsers = (req, res) => {
  User.find({})
    .select('id username password')
    .then((response) => {
      res
        .status(200)
        .json({
          users: response,
        });
    })
    .catch();
};

exports.createUser = (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    res.status(400).json({
      error: 'Username is required!',
    });
    return;
  }

  if (!password) {
    res.status(400).json({
      errro: 'Password is required',
    });
    return;
  }

  User.find({ username })
    .then((findResponce) => {
      if (findResponce.length === 0) {
        const user = new User({
          username,
          password,
        });
        user.save()
          .then((saveResponse) => {
            res.status(200).json({
              id: saveResponse._id, // eslint-disable-line
              username: saveResponse.username,
              password: saveResponse.password,
            });
          })
          .catch((error) => {
            res.json({ error });
          });
      } else {
        res.json({ error: 'Not unique username' });
      }
    })
    .catch((error) => {
      res.json({ error });
    });
};
