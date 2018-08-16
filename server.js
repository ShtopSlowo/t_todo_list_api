const express = require('express');
const morgan = require('morgan');

const db = require('./src/mongoDB');
const { serverStartMessage } = require('./src/serverUtils');
const { userRouter, todosRouter } = require('./src/routes/');

const PORT = process.env.PORT || 3000;
const app = express();

db.connection.on('open', () => {
  console.info('MongoDB has been connected!');
});

db.connection.on('error', (err) => {
  console.info(err);
});

app.use(morgan('dev'));

app.use('/users', userRouter);
app.use('/todos', todosRouter);

app.get('/', (req, res) => {
  res
    .status(200)
    .send('Todo list api works!');
});

app.use('*', (req, res) => {
  res
    .status(404)
    .send('Not found');
});

app.listen(PORT, () => serverStartMessage(PORT));
