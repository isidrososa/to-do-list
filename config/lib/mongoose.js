'use strict';

var config = require('../config'),
  chalk = require('chalk'),
  mongoose = require('mongoose');

module.exports = function() {
  mongoose.Promise = global.Promise;
  var db = mongoose.connect(config.db.uri, config.db.options, function (err) {
    if (err) {
      console.error(chalk.red('Unable to connect to the server. Please start the server. Error: \n' + err));
    } else {
      console.log(chalk.green('Connect to ' + process.env.NODE_ENV + ' db successfully'));
    }
  });

  return db;
};