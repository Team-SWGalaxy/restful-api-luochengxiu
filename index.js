var express = require('express');
var fs = require('fs');
var app = express();

var insertItems = require('./insert-items');
var getAllItems = require('./get-all-items');
var getOneItem = require('./get-one-item');
var deleteItem = require('./delete-item');
var updateItem = require('./update-items');

fs.exists('./items.json', function (exists) {
  if (!exists) {
    if (!fs.createWriteStream('items.json', {encoding: "utf8"})) {
      console.log('error error');
    }

    fs.writeFile('./items.json', JSON.stringify([]));
  }
});

app.use('/items', insertItems);
app.use('/items', getAllItems);
app.use('/items', getOneItem);
app.use('/items', deleteItem);
app.use('/items', updateItem);

app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).send('Some errors happened, please see the log on server');
});

app.listen(3000, function () {
  console.log('server started at port 3000');
});

module.exports = app;
