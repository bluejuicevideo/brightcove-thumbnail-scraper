const chalk = require('chalk');

module.exports.logError = function logError(error) {
    console.log(chalk.red(error));
};

module.exports.logInfo = function logInfo(message) {
    console.log(chalk.blue(message));
};

module.exports.logSuccess = function logInfo(message) {
    console.log(chalk.green(message));
};
