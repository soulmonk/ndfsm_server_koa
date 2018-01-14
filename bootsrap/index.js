'use strict';

const path = require('path');
process.env.NODE_CONFIG_DIR = path.join(__dirname, '../config');

const config = require('config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(config.db.url, config.db.options);

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
