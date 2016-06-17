var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/', function (req, res, next) {
    var data = receiveData(req);
    if (isCorrectDataType(data)) {
        insertItem(data, next);
        res.status(201).json(data);

    }
    else {
        res.status(400).end();
    }
});

function receiveData(req) {
    return {
        "barcode": req.body.barcode,
        "name": req.body.name,
        "price": req.body.price,
        "unit": req.body.unit
    };
}

function isCorrectDataType(data) {
    if (typeof (data.barcode) === 'string' &&
        typeof (data.name) === 'string' &&
        typeof (data.price) === 'number' &&
        typeof (data.unit) === 'string') {

        return true;
    }
}

function insertItem(data) {
    data.id = id++;
    fs.readFile('./items.json', 'UTF-8', function (err, items) {
        if (err) return next(err);

        items = JSON.parse(items);
        items.splice(items.length, 0, data);
        fs.writeFile('./items.json', JSON.stringify(items));
    });
}

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send('Some errors happened, please see the log on server');
});

module.exports = app;