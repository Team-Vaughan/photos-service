const db = require('../../database');

const getRoomPhotosByNumber = async (req, res) => {
  const { id } = req.params;

  try {
    const photos = await db.getPhotosByRoomId(id);
    const response = [];
    photos.forEach((photo, i) => {
      if (photo.dataValues.is_primary === null) {
        photo.dataValues.is_primary = true;
      }
      response.push(photo.dataValues);
    });

    res.status(200).json(response);

  } catch(e) {
    res.status(500).send(e);
  }

}

const addPhotoToRoom = async (req, res) => {

  const expectedShape = {
    roomNumber: 'Number',
    name: 'String',
    caption: 'String',
    storage_url: 'String'
  };

  for (let key in expectedShape) {
    if (!req.body[key]) {
      res.status(500).send(`missing data ${key}`);
    }
  }

  try {
    const response = await db.addRoomPhotos(req.body);
    res.status(200).send(response);
  } catch(e) {
    res.status(500).send(e);
  }

}

const updateRoomPhoto = async (req, res) => {
  const { roomNumber, id } = req.body;

  if (!roomNumber || !id) {
    res.status(500).send('Must specificy both roomNumber and photo id');
  } else {
    try {
      const response = await db.updateRoomPhoto(req.body);
      res.status(200).send(response);
    } catch(e) {
      res.status(500).send(e);
    }
  }
}

const deleteRoom = async (req, res) => {
  const { roomNumber } = req.body;

  if (!roomNumber) {
    res.status(500).send('ID does not match record in database');
  } else {
    try {
      const response = await db.deleteRoom(roomNumber);
      res.status(200).send(response);
    } catch(e) {
      res.status(500).send(e);
    }
  }
}

module.exports = {
  getRoomPhotosByNumber,
  addPhotoToRoom,
  updateRoomPhoto,
  deleteRoom
}