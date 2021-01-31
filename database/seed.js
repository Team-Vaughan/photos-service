const mongoose = require('mongoose');
const faker = require('faker');
const { Photo } = require('./schema.js');
const { config } = require('../config.js');
const { createBucket, deleteBucket, uploadFile }  = require('./aws-s3.js');
const { getRandomImage } = require('./fileHelper.js');

const {db: {host, port, name}} = config;

mongoose.connect(`mongodb://${host}:${port}/${name}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

Photo.deleteMany({}).then(() => {
  console.log('deleted all photos..');
  seed();
});

const seed = async() => {
  await deleteBucket();
  await createBucket();
  for (let i = 100; i < 101; i++) {
    let isPrimary = true;
    for (let j = 100; j < 101; j++) {
      let imageName = faker.commerce.productAdjective();
      let imageStream = await getRandomImage();
      let uploadURL = await uploadFile(imageStream, imageName);
      let propertyPhoto = new Photo({
        room_id: i,
        name: imageName,
        photo_id: i.toString() + j.toString(),
        caption: faker.commerce.productName(),
        is_primary: isPrimary,
        storage_url: uploadURL
      });
      propertyPhoto.save().then(() => {
        console.log('saved in db..');
      });
      isPrimary = false;
    }
  }
};
