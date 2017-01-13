'use strict';

var express = require('express'),
  morgan = require('morgan'),
  compression = require('compression'),
  bodyParser = require('body-parser'),
  engines = require('consolidate');


module.exports = function () {

  var app = express();

  // Middleware
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compression());
  }
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Set views engine
  app.engine('html', engines.nunjucks);
  app.set('view engine', 'html');
  app.set('views', './server/views');

  // Set statics files
  app.use('/', express.static('./client/dist'));
  app.use('/lib', express.static('./client/lib'));
  app.use('/node_modules', express.static('./node_modules'));

  // Routes
  require('../../server/routes/index.server.routes')(app);

  return app;
};