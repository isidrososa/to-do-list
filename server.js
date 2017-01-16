'use strict';

var express = require('./config/lib/express'),
    mongoose = require('./config/lib/mongoose'),
    port = process.env.PORT || 8080,
    chalk = require('chalk'),
    app = express();

// Connect to database
var db = mongoose();

app.listen(port);

console.log(chalk.blue('Server running on port: ' + port));