var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var _ = require('lodash');
var app = express();

app.use(bodyParser.json());

app.put('/:id', function (req, res, next) {
  fs.readFile('./items.json', 'UTF-8', function (err, fileContent) {
    if (err) return next(err);

    var items = JSON.parse(fileContent);
    var position = _.findIndex(items, function (item) {
      return item.id === parseInt(req.params.id);
    });

    var itemNotFound = position === -1;
    if (itemNotFound) {
      res.status(404).end();
    }
    else {
      var data = receiveData(req);
      if (isCorrectDataType(data)) {
        var item = updateItems(items, position, data);
        res.status(200).json(item);
      }
      else {
        res.status(400).end();
      }
    }
  });
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

function updateItems(items, position, data) {
  items[position] = updated(items[position], data);
  writeFile(items);
  return items[position];
}

function updated(item, data) {
  item.barcode = data.barcode;
  item.name = data.name;
  item.price = data.price;
  item.unit = data.unit;

  return item;
}

function writeFile(items) {
  fs.writeFile('./items.json', JSON.stringify(items));
}

module.exports = app;
