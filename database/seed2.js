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

  let roomNumber = 0;

  for (let run = 0; run < 1000; run++) {

    let rooms = [];

    for (let i = 0; i < 10000; i ++) {
      rooms.push({ roomNumber });
      roomNumber++;
    }

    try {
      await sequelize.models.rooms.bulkCreate(rooms);
    } catch(e) {
      console.error(e);
    }

    const photosToAdd = [];

    for (const room of rooms) {

      const roomPhotos = returnRandomIndex(photoOptions);

      roomPhotos.forEach(pic => {
        pic.roomRoomNumber = room.roomNumber;
        photosToAdd.push(pic);
      });

    };

    try {
      await sequelize.models.photos.bulkCreate(photosToAdd);
    } catch (e) {
      console.error(e);
    }

    console.log(`Completed ${run} run`);

  };

};

seed();