var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var _ = require('lodash');

app.use(bodyParser.json());

app.delete('/:id', function (req, res, next) {

    fs.readFile('./items.json', 'UTF-8', function (err, data) {
        if (err) return next(err);

        items = JSON.parse(data);
        var position = _.findIndex(items, function (item) {
            return item.id === parseInt(req.params.id);
        });

        if (position === -1) {
            res.status(404).end();
        }
        else {
            deleteItem(items, position);
            res.status(204).end();
        }
    });
});

function deleteItem(items, position) {
    items.splice(position, 1);
    fs.writeFile('./items.json', JSON.stringify(items));
}

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send('Some errors happened, please see the log on server');
});

module.exports = app;