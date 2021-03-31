const { models } = require('./Models');

const getPhotosByRoomId = async (id) => {
  const numFromId = parseInt(id)
  console.log(typeof numFromId)
  const photos = await models.rooms.findAll({
    where: {
      roomNumber: numFromId
    },
    // include: [photos]
  });
  console.log(photos)
};

const addRoomPhotos = (body) => {

  const {
    room_id,
    name,
    caption,
    storage_url
  } = body;

  return new Promise((resolve, reject) => {
    Photo.find({room_id}, (err, photos) => {
      if (err) {
        reject(err);
      } else {
        const propertyPhoto = new Photo({
          room_id,
          name,
          caption,
          is_primary: false,
          storage_url
        });
        propertyPhoto.save().then(() => {
          resolve('saved photo');
        });
      }
    });
  });
};

const updateRoomPhoto = (body) => {

  const { room_id, _id, ...dataToUpdate } = body;

  return new Promise((resolve, reject) => {
    Photo.find({room_id}, (err, photos) => {
      if (err) {
        reject(err);
      } else {
        let updated = false;
        photos.forEach(photo => {
          if (photo._id.toString() === _id) {
            for (let key in photo) {
              if (typeof dataToUpdate[key] === 'string') {
                photo[key] = dataToUpdate[key];
                photo.save();
                updated = true;
              }
            }
          }
        });
        updated ? resolve('Updated photo') : reject('Unable to find');
      }
    });
  });
};

const deleteRoom = (room_id) => {
  return new Promise((resolve, reject) => {
    Photo.find({room_id}, (err, roomPhotos) => {
      if (err) {
        reject(err);
      } else {
        roomPhotos.forEach(room => {
          room.remove();
        });
        resolve('Done');
      }
    });
  });
};

module.exports = {
  getPhotosByRoomId,
  // addRoomPhotos,
  // updateRoomPhoto,
  // deleteRoom
};