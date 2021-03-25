const dotenv = require('dotenv');
dotenv.config();
const nano = require('nano')(`http://admin:${process.env.COUCH_DB_PASSWORD}@localhost:5984`);
const faker = require('faker');
const { config } = require('../config.js');
const { listPhotos }  = require('./aws-s3.js');

const seed = async (database) => {

  const photos = await listPhotos();
  let docs = [];
  let room_number = 0;

  for (let run = 0; run < 10000; run++) {
    for (let i = 0; i < 5; i++) {
      let roomPhotos = [];
      photos.Contents.forEach((photo, j) => {
        if (j % 5 === 0) {
          const storage_url = `https://sdc-airbnb-photos.s3.us-east-2.amazonaws.com/${photo.Key}`
          const name = photo.Key.split('.')[0];
          const caption = faker.commerce.productName();
          const is_primary = true;
          roomPhotos.push({ storage_url, name, caption, is_primary });
          room_number += 1;
          docs.push({room_number, photos: roomPhotos});
          roomPhotos = [];
        } else {
          const storage_url = `https://sdc-airbnb-photos.s3.us-east-2.amazonaws.com/${photo.Key}`
          const name = photo.Key.split('.')[0];
          const caption = faker.commerce.productName();
          const is_primary = false;
          roomPhotos.push({ storage_url, name, caption, is_primary });
        }
      });
    };

    try {
      console.log(`finished ${run} run`);
      const response = await database.bulk({ docs });
      docs = [];
    } catch(e) {
      console.error(e);
    }

  }

};

const createDB = async () => {
  try {
    await nano.db.destroy('sdc-couch');
    await nano.db.create('sdc-couch');
    const couchdb = nano.use('sdc-couch');
    return couchdb
  } catch(e) {
    console.error(e);
  }
};

createDB().then(database => {
  seed(database);
});