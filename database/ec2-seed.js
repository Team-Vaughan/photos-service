const faker = require('faker');
const { config } = require('../config.js');
const { createBucket, deleteBucket, uploadFile, listPhotos }  = require('./aws-s3.js');
const sequelize = require('../database/Models');

const seed = async (database) => {

  const s3Photos = await listPhotos();
  let rooms = [];
  let photos = [];
  let roomNumber = 0;

  for (let run = 0; run < 3000; run++) {
    for (let i = 0; i < 5; i++) {
      s3Photos.Contents.forEach((photo, j) => {
        const storage_url = `https://sdc-airbnb-photos.s3.us-east-2.amazonaws.com/${photo.Key}`
        const name = photo.Key.split('.')[0];
        const caption = faker.commerce.productName();
        if (j % 5 === 0) {
          const is_primary = true;
          roomNumber += 1;
          photos.push({ storage_url, name, caption, roomRoomNumber: roomNumber, is_primary });
          rooms.push({ roomNumber });
        } else {
          const is_primary = false;
          photos.push({ storage_url, name, caption, is_primary, roomRoomNumber: roomNumber });
        }
      });
    };

    try {
      console.log(`finished ${run} run`);
      await sequelize.models.rooms.bulkCreate(rooms);
      await sequelize.models.photos.bulkCreate(photos);
      photos = [];
      rooms = [];
    } catch(e) {
      console.error(e);
    }

  }

};

seed();