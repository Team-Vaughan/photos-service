//Use this file to delete existing and create new db w/o using psql CLI
const pgtools = require('pgtools');
const dotenv = require('dotenv');
dotenv.config();

const config = {
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  host: process.env.POSTGRES_HOST
};

pgtools.dropdb(config, 'sdc', (err, res) => {
  if (err) {
    console.error(err);
  }
  pgtools.createdb(config, 'sdc', (err, res) => {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    console.log(res);
  });

  console.log(res);

});