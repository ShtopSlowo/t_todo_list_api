const { CYAN } = require('./constants/consoleColor');

exports.serverStartMessage = (PORT) => {
  // eslint-disable-next-line
  console.info(CYAN, `
  Server is running ...
  Check http://localhost:${PORT}
  `);
};


exports.badRequest = (req, res, error) => {
  res
    .status(400)
    .json({
      error,
    });
};
