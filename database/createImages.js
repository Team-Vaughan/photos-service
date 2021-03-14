const faker = require('faker');
const { config } = require('../config.js');
const { uploadFile }  = require('./aws-s3.js');
const { getRandomImage } = require('./fileHelper.js');

//for adding photos to s3 bucket
const seedPhotos = async () => {
  for (let i = 0; i < 500; i++) {
    try {
      const imageName = faker.commerce.productAdjective();
      const imageStream = await getRandomImage();
      const uploadURL = await uploadFile(imageStream, imageName + i.toString());
    } catch(err) {
      console.log(err);
    }
  };
}

seedPhotos();
