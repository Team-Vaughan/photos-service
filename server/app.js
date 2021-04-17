const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const controllers = require('./Controllers');
const cache = require('express-redis-cache')();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/rooms/:id', express.static(__dirname + '/../client/dist'));
app.use('/rooms/:id', express.static(__dirname + '/../public'));


app.get('/rooms/:id/getPhotosByRoomId', (req, res, next) => {
  const name = req.body.roomNumber;
  if (name) {
    res.express_redis_cache_name = name;
  }
  next();
},
cache.route({ expire: 50000 }),
controllers.getRoomPhotosByNumber);

app.post('/rooms/addRoomPhoto', controllers.addPhotoToRoom);
app.put('/rooms/updateRoomPhoto', controllers.updateRoomPhoto);
app.delete('/rooms/deleteRoom', controllers.deleteRoom);

module.exports = app;