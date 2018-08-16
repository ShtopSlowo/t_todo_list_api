const mongoose = require('mongoose');

const User = require('../models/User');

exports.getAllUsers = (req, res) => {
  res
    .status(200)
    .send('GET all users!');
};

exports.createUser = (req, res) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: 'Test',
    password: 'TestPassword',
  });
  user.save()
    .then(() => console.log('Add success!'))
    .catch(err => console.log(err));
  res
    .status(200)
    .send('Hello');
};
