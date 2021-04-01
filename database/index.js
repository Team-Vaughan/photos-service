const { models } = require('./Models');

const getPhotosByRoomId = id => {

  const numFromId = parseInt(id);

  return new Promise(async (resolve, reject) => {
    const roomAndPhotoData = await models.rooms.findAll({
      include: [
        {
          model: models.photos,
          where: { roomRoomNumber: id }
        }
      ]
    });

    const { photos } = roomAndPhotoData[0];

    if (photos.length) {
      resolve(photos);
    } else {
      reject('No photos found');
    }

  });

};

const addRoomPhotos = body => {

  const {
    roomNumber,
    name,
    caption,
    storage_url
  } = body;

  return new Promise(async (resolve, reject) => {
    try {
      await models.photos.create(body);
      resolve('successfully added photo to room');
    } catch(e) {
      reject(e);
    }
  });
};

const updateRoomPhoto = body => {

  const { roomNumber, id, ...dataToUpdate } = body;

  return new Promise(async (resolve, reject) => {

    const photo = await models.photos.findOne({ where: { id } });

    if (photo) {
      photo.update(dataToUpdate)
        .then(response=> {
          resolve(response);
        });
    } else {
      reject('Could not find photo to update');
    }
  });
};

const deleteRoom = roomNumber => {
  return new Promise(async (resolve, reject) => {
    const rooms = await models.rooms.findAll({ where: { roomNumber } });
    const photos = await models.photos.findAll({ where: { roomRoomNumber: roomNumber } });

    rooms.forEach(room => {
      room.destroy();
    });

    photos.forEach(photo => {
      photo.destroy();
    });

    resolve('Room deleted');

  });
};

module.exports = {
  getPhotosByRoomId,
  addRoomPhotos,
  updateRoomPhoto,
  deleteRoom
};