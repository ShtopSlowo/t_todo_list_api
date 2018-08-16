const express = require('express');
const morgan = require('morgan');

const { serverStartMessage } = require('./src/serverUtils');
const { userRouter, todosRouter } = require('./src/routes/');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.use('/users', userRouter);
app.use('/todos', todosRouter);

app.get('/', (req, res) => {
  res
    .status(200)
    .send('Todo list api works!');
});

app.listen(PORT, () => serverStartMessage(PORT));
