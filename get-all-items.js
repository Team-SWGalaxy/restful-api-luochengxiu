var express = require('express');
var fs = require('fs');
var app = express();

app.get('/', function (req, res, next) {
  fs.readFile('./items.json', 'UTF-8', function (err, data) {
    if (err) return next(err);

    res.json(JSON.parse(data));
  });
});

module.exports = app;
