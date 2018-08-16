const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const db = require('./src/mongoDB');
const { serverStartMessage } = require('./src/serverUtils');
const { userRouter, todosRouter } = require('./src/api/routes/');
const { GREEN } = require('./src/constants/consoleColor');

const PORT = process.env.PORT || 3000;
const app = express();

db.connection.on('open', () => {
  // eslint-disable-next-line
  console.log(GREEN, 'MongoDB has been connected!');
});

db.connection.on('error', (err) => {
  // eslint-disable-next-line
  console.error('Error occured: ', err);
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
