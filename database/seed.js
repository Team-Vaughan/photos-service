const faker = require('faker');
const { config } = require('../config.js');
const { createBucket, deleteBucket, uploadFile, listPhotos }  = require('./aws-s3.js');

//import psql

//wipe current db



const seed = async () => {

  const photos = await listPhotos();

  // loop 1000 times, in each loop, loop through photos url, get applicable data points, and seed db
  photos.Contents.forEach(photo => {
    const storage_url = `https://sdc-airbnb-photos.s3.us-east-2.amazonaws.com/${photo.Key}`
    const name = photo.Key.split('.')[0];
    const caption = faker.commerce.productName();
    //need room_id, photo_id,

  })
}

seed();