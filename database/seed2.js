const faker = require('faker');
const { config } = require('../config.js');
const { createBucket, deleteBucket, uploadFile, listPhotos }  = require('./aws-s3.js');
const sequelize = require('../database/Models');

const returnRandomIndex = arr => arr[Math.floor(Math.random() * arr.length)]

const seed = async (database) => {

  const s3Photos = await listPhotos();
  const photoOptions = [];
  let group = [];

  s3Photos.Contents.forEach((photo, j) => {
    const storage_url = `https://sdc-airbnb-photos.s3.us-east-2.amazonaws.com/${photo.Key}`
    const name = photo.Key.split('.')[0];
    const caption = faker.commerce.productName();
    if (j % 5 === 0 && j !== 0) {
      const is_primary = true;
      group.push({ storage_url, name, caption, is_primary });
      photoOptions.push(group);
      group = [];
    } else {
      const is_primary = false;
      group.push({ storage_url, name, caption, is_primary });
    }
  });


  let rooms = [];
  let roomNumber = 0;

  for (let i = 0; i < 1000; i ++) {
    rooms.push({ roomNumber });
    roomNumber++;
  }

  try {
    await sequelize.models.rooms.bulkCreate(rooms);
  } catch(e) {
    console.error(e);
  }

  for (const room of await sequelize.models.rooms.findAll()) {
    const roomPhotos = returnRandomIndex(photoOptions);

    roomPhotos.forEach(pic => {
      pic.roomRoomNumber = room.roomNumber;
    });
    try {
      await sequelize.models.photos.bulkCreate(roomPhotos);
    } catch (e) {
      console.error(e)
    }

  }

};

seed();