'use strict';

exports.renderIndex = function(req, res) {
  res.render('index', {
    title: 'to Do List App'
  });
};
