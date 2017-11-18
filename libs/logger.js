'use strict';

const path = require('path');

/**
 * @class
 * @extends {winston.Logger}
 * @property {function(*,...)} netdbg
 * @property {function(*,...)} scrdbg
 * @property {function(*,...)} DBdbg
 * @property {function(*,...)} debug
 * @property {function(*,...)} info
 * @property {function(*,...)} notice
 * @property {function(*,...)} warn
 * @property {function(*,...)} error
 * @property {function(*,...)} crit
 * @property {function(*,...)} alert
 * @property {function(*,...)} emerg
 * @property {function(*,...)} forgingdbg
 * @property {function()} disable
 */
const logger = (function(config) {
  const winston = require('winston'); // logging

  const loggingLevels = {
    levels: {
// =========================================================================
// Set any of these to 1 to enable the corresponding debug channel.
// -------------------------------------------------------------------------
      netdbg: 1, // Network debugging
      scrdbg: 0, // Script interpreter debugging
      DBdbg: 1,
// =========================================================================
      debug: 1,
      info: 10,
      notice: 20,
      warn: 30,
      error: 40,
      crit: 50,
      alert: 60,
      emerg: 70
    },
    colors: {
      netdbg: 'blue',
      scrdbg: 'blue',
      DBdbg: 'blue',
      debug: 'blue',
      info: 'green',
      notice: 'cyan',
      warn: 'yellow',
      error: 'red',
      crit: 'red',
      alert: 'yellow',
      emerg: 'red'
    }
  };

  const logger = new winston.Logger({
    transports: [
      new winston.transports.Console({
        colorize: true,
        level: 'emerg',
      }),
      new winston.transports.File({
        level: 'emerg',
        filename: path.join(config.root, 'logs', 'logs.log'),
        maxsize: 5242880,
        maxFiles: 5
      })
    ],
    levels: loggingLevels.levels,
    level: 'debug'
  });

  winston.addColors(loggingLevels.colors);

  return logger;
})(require('config'));

module.exports = logger;