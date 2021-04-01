const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const controllers = require('./Controllers');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/rooms/:id', express.static(__dirname + '/../client/dist'));
app.use('/rooms/:id', express.static(__dirname + '/../public'));


app.get('/rooms/:id/getPhotosByRoomId', controllers.getRoomPhotosByNumber);
app.post('/rooms/addRoomPhoto', controllers.addPhotoToRoom);
app.put('/rooms/updateRoomPhoto', controllers.updateRoomPhoto);
app.delete('/rooms/deleteRoom', controllers.deleteRoom);

module.exports = app;