var fs = require('fs');
var id;

fs.readFile('./id.json', 'UTF-8', function (err, data) {

    if (err) return;
    id = JSON.parse(data).id;
});

module.exports = function () {

    id += 1;
    fs.writeFile('./id.json', JSON.stringify({"id": id}));
    return id;
};