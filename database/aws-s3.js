const { config } = require('../config.js');
const { S3Client, ListBucketsCommand, CreateBucketCommand, PutObjectCommand, DeleteBucketCommand } = require('@aws-sdk/client-s3');
const { aws: { AWS_REGION, AWS_BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } } = config;
const AWS = require('aws-sdk');

const s3v2 = new AWS.S3();

const s3 = new S3Client({ Region: process.env.AWS_REGION });

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
});

//list photos from s3 bucket
const listPhotos = async () => {

  const getParams = {
    Bucket: 'sdc-airbnb-photos',
  }

  return new Promise(async (resolve, reject) => {
    try {
      const bucket = await s3v2.listObjects(getParams, (err, data) => {
        if (err) console.log(err);
        else {
          resolve(data)
        }
      });
    } catch(err) {
      console.log(err);
    }
  })
}

// Get all buckets
const getBuckets = async () => {
  try {
    const bucketList = await s3.send(new ListBucketsCommand({}));
    console.log(bucketList.Buckets);
  } catch(err) {
    console.log(err);
  }
};

// creates a new bucket

const createBucket = async () => {
  const bucketParams = {
    Bucket: AWS_BUCKET_NAME,
    ACL: 'public-read'
  };

  try {
    const newBucket = await s3.send(new CreateBucketCommand(bucketParams));
    console.log('Bucket created succesfully: ', newBucket.Location);
  } catch (err) {
    console.log('Error in creating new bucket: ', err);
  }
}

// deletes an empty bucket

const deleteBucket = async () => {
  const bucketParams = {
    Bucket: AWS_BUCKET_NAME,
    ACL: 'public-read'
  };

  try {
    const deletedBucket = await s3.send(new DeleteBucketCommand(bucketParams));
    console.log('Bucket deleted succesfully: ');
  } catch (err) {
    console.log('Error in creating new bucket: ', err);
  }
}

// uploads a file to bucket using aws v3

const uploadFileV3 = async (fileStream, fileName) => {
  let uploadParams = {
    Body: fileStream.data,
    Key: fileName,
    ACL: 'public-read',
    Bucket: AWS_BUCKET_NAME,
    ContentType: 'image/jpeg',
    ContentLength: 38153
  }
  try {
    const uploadedFile = await s3.send(new PutObjectCommand(uploadParams));
    console.log('File uploaded: ', uploadedFile);
    return uploadedFile.Location;
  } catch (err) {
    console.log('Error in file upload: ', err);
  }
}

// uploads a file to bucket using aws v2

const uploadFile = async (fileStream, fileName) => {
  let uploadParams = {
    Body: fileStream.data,
    Key: `${fileName}.jpg`,
    ACL: 'public-read',
    // Bucket: AWS_BUCKET_NAME,
    Bucket: 'sdc-airbnb-photos',
    ContentType: 'image/jpeg',
  }

  return new Promise((resolve, reject) => {
    s3v2.upload(uploadParams, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      if (data) {
        resolve(data.Location);
      }
    });
  });

}

module.exports = {
  createBucket,
  deleteBucket,
  uploadFile,
  listPhotos
}


