var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.delete('/:id', function (req, res) {
    var id = req.params.id;

    fs.readFile('./items.json', 'UTF-8', function (err, items) {
        if (err) throw err;

        items = JSON.parse(items);
        var position = findPosition(items, JSON.parse(id));

        if (position === null) {
            res.status(404).end();
        }
        else {
            deleteItem(items,position);
            res.status(204).end();
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

function deleteItem(items, position) {
    items.splice(position, 1);
    fs.writeFile('./items.json', JSON.stringify(items));
}

module.exports = app;