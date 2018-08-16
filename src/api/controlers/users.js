const User = require('../models/User');

exports.getAllUsers = (req, res) => {
  User.find({})
    .select('id username password')
    .then((findResponse) => {
      const users = findResponse.map((u) => {
        const user = {
          id: u._id, // eslint-disable-line
          username: u.username,
        };
        return user;
      });
      res
        .status(200)
        .json(users);
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
        res.status(400).json({ error: 'Not unique username' });
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((findByIdResponse) => {
      res.status(201).json({
        id: findByIdResponse._id,  // eslint-disable-line
        username: findByIdResponse.username,
      });
    })
    .catch(() => {
      res.status(404).json({
        msg: 'Not Found',
      });
    });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  User.findByIdAndRemove(id)
    .then((removeResponse) => {
      if (removeResponse !== null) {
        res.status(200).json({ ok: 'dad' });
      } else {
        res.status(404).json();
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { currentPassword } = req.body;
  User.findById(id)
    .then((findByIdReponse) => {
      if (findByIdReponse.password !== currentPassword) {
        res.status(401).json({ message: 'Current password is invalid' });
        return;
      }
      User.findByIdAndUpdate(id, req.body)
        .then(() => {
          res.status(201).json({
            message: 'User update successful',
          });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
