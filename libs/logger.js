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

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'];

  const pad = function(n) {
    return n < 10 ? '0' + n.toString(10) : n.toString(10);
  };

  const pad3 = function(n) {
    let num = n.toString(10);
    while (num.length < 3) num = '0' + num;
    return num;
  };

  const timestamp = function() {
    const d = new Date();
    let time = [
      pad(d.getHours()),
      pad(d.getMinutes()),
      pad(d.getSeconds())
    ].join(':');
    time += '.' + pad3(d.getMilliseconds());

    return [d.getDate(), months[d.getMonth()], time].join(' ');
  };
  const exports = {};

  const logger = new winston.Logger({
    transports: [
      new winston.transports.Console({
        colorize: true,
        level: 'emerg',
        timestamp: timestamp
      }),
      new winston.transports.File({
        level: 'emerg',
        timestamp: timestamp,
        filename: path.join(config.root, 'logs/logs.log'),
        maxsize: 5242880,
        maxFiles: 5
      })
    ],
    levels: loggingLevels.levels,
    level: 'debug'
  });

  winston.addColors(loggingLevels.colors);

  logger.loggerOn = true;

  logger.disable = function() {
    if (logger.loggerOn === false) {
      return;
    }
    logger.loggerOn = false;
    logger.remove(winston.transports.Console);
    logger.remove(winston.transports.File);
  };
  return logger;
})(require('config'));

//logger.disable();

module.exports = logger;