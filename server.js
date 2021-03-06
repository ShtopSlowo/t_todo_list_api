const express = require('express');

const { serverStartMessage } = require('./src/serverUtils');

const PORT = process.env.PORT || 3000;
const app = express();

app.listen(PORT, () => serverStartMessage(PORT));
