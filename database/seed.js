const faker = require('faker');
const { config } = require('../config.js');
const { createBucket, deleteBucket, uploadFile, listPhotos }  = require('./aws-s3.js');
const sequelize = require('../database/Models');

const seed = async () => {

  const photos = await listPhotos();
  const objects = [];

  for (let i = 0; i < 1000; i++) {
    photos.Contents.forEach(photo => {
      const storage_url = `https://sdc-airbnb-photos.s3.us-east-2.amazonaws.com/${photo.Key}`
      const name = photo.Key.split('.')[0];
      const caption = faker.commerce.productName();
      const is_primary = i % 5 === 0;
      objects.push({ storage_url, name, caption, is_primary });
    });
  };

  sequelize.models.photos.bulkCreate(objects);

};

seed();