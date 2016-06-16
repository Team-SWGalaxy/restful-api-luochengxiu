var express = require('express');
var app = express();
var fs = require('fs');

app.get('/', function (req, res) {
    fs.readFile('./items.json', 'UTF-8', function (err, data) {
        if (err) throw err;

        res.json(JSON.parse(data));
    });
});

module.exports = app;