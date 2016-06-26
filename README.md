#restful-api-luochengxiu

##design a restful webApi to add,delete,get,update items

###*steps*

clone to your local host
```
git clone git@github.com:five-girls/restful-api-luochengxiu.git
```

startup 
```
node index.js 
or 
nodemon index.js
```

visit postman or command line
```
curl http://localhost:3000/items
curl http://localhost:3000/items/1
curl -X POST -d '{"barcode":"ITEM0001","name":"Apple","price":3.2,"unit":"kg"}' -H "Content-Type: application/json" http://localhost:3000/items/1
curl -X DELETE http://localhost:3000/items/1
curl -X PUT -d '{"barcode":"ITEM0001","name":"Apple","price":3.2,"unit":"kg"}' -H "Content-Type: application/json" http://localhost:3000/items/1
```

how to install nodemon

```
npm inatall -g nodemon 
```
