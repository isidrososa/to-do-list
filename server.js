'use strict';

var express = require('./config/lib/express'),
    port = process.env.PORT || 8080,
    chalk = require('chalk'),
    app = express();

app.listen(port);

console.log(chalk.blue('Server running on port: ' + port));