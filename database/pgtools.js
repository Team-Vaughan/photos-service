const pgtools = require('pgtools');

const config = {
  user: 'christophertulin',
  // password: 'some pass',
  port: 5432,
  host: 'localhost'
};

pgtools.dropdb(config, 'sdc', function (err, res) {
  if (err) {
    console.error(err);
    pgtools.createdb(config, 'test-db', function (err, res) {
      if (err) {
        console.error(err);
        process.exit(-1);
      }
      console.log(res);
    });
  }

  console.log(res);

});

// const { Pool } = require('pg');
// const pool = new Pool({
//   user:
// })