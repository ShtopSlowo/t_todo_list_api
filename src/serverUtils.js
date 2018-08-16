const { CYAN } = require('./constants/consoleColor');

module.exports.serverStartMessage = (PORT) => {
  console.log(CYAN, `
  Server is running ...
  Check http://localhost:${PORT}
  `);
};
