var express = require('express');
var app = express();
var fs = require('fs');

app.get('/:id', function (req, res) {
    var id = req.params.id;

    fs.readFile('./items.json', 'UTF-8', function (err, items) {
        if (err) throw err;

        items = JSON.parse(items);
        var position = findPosition(items, JSON.parse(id));
        if (position === null) {
            res.status(404).end();
        }
        else {
            res.status(200).json(items[position]);
        }
    });
});

function findPosition(items, id) {
    for (var i = 0; i < items.length; i++) {
        if (items[i].id === id) {

            return i;
        }
    }
    return null;
}

module.exports = app;