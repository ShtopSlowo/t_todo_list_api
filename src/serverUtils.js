const { CYAN } = require('./constants/consoleColor');

module.exports.serverStartMessage = (PORT) => {
  // eslint-disable-next-line
  console.info(CYAN, `
  Server is running ...
  Check http://localhost:${PORT}
  `);
};
