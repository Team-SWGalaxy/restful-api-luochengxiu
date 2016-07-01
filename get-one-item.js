var express = require('express');
var fs = require('fs');
var _ = require('lodash');
var app = express();

app.get('/:id', function (req, res, next) {
  fs.readFile('./items.json', 'UTF-8', function (err, items) {
    if (err) return next(err);

    items = JSON.parse(items);
    var position = _.findIndex(items, function (item) {
      return item.id === parseInt(req.params.id);
    });
    if (position === -1) {
      res.status(404).end();
    }
    else {
      res.status(200).json(items[position]);
    }
  });
});

module.exports = app;
