const express = require('express');
const bodyParser = require('body-parser');
// const db = require('../database/index.js');
const app = express();
// const sequelize = require('../database/Models');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/rooms/:id', express.static(__dirname + '/../client/dist'));
app.use('/rooms/:id', express.static(__dirname + '/../public'));

const controllers = require('./Controllers');

app.get('/rooms/:id/getPhotosByRoomId', controllers.getRoomPhotosByNumber);

// app.get('/rooms/:id/getPhotosByRoomId', (req, res) => {
//   db.getPhotosByRoomId(req.params.id)
//     .then(response => {
//       if (response.length) {
//         res.status(200).send(response);
//       } else {
//         res.status(400).send('No photos associated with room');
//       }
//     })
//     .catch(error => {
//       res.status(500).send(error);
//     });
// });

// app.post('/rooms/addRoomPhoto/', (req, res) => {

//   const expectedShape = {
//     room_id: 'Number',
//     name: 'String',
//     caption: 'String',
//     storage_url: 'String'
//   };

//   for (let key in expectedShape) {
//     if (!req.body[key]) {
//       res.status(500).send(`missing data ${key}`);
//     }
//   }

//   db.addRoomPhotos(req.body)
//     .then(response => {
//       console.log(response);
//     })
//     .catch(error => {
//       res.status(500).send(error);
//     });
// });

// app.put('/rooms/updateRoomPhoto', (req, res) => {
//   const { room_id, _id } = req.body;

//   if (!room_id || !_id) {
//     res.status(500).send('Must specificy both room_id and object_id');
//   } else {
//     db.updateRoomPhoto(req.body)
//       .then(response => {
//         res.status(200).send('Room Updated');
//       })
//       .catch(error => {
//         res.status(500).send('Unable to update room');
//       });
//   }
// });

// app.delete('/rooms/deleteRoom', (req, res) => {

//   const { room_id } = req.body;

//   if (!room_id) {
//     res.status(500).send('ID does not match record in database');
//   } else {
//     db.deleteRoom(req.body.room_id)
//       .then(response => {
//         console.log(response);
//         res.status(200).send(`Room ${room_id} successfully deleted`);
//       })
//       .catch(error => {
//         res.status(500).send(error);
//       });
//   }
// });

module.exports = app;