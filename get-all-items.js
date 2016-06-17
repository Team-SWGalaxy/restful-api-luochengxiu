var express = require('express');
var app = express();
var fs = require('fs');

app.get('/', function (req, res, next) {
    fs.readFile('./items.json', 'UTF-8', function (err, data) {
        if (err) return next(err);

        res.json(JSON.parse(data));
    });
});

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send('Some errors happened, please see the log on server');
});

module.exports = app;