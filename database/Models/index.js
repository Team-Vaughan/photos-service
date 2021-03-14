const { Sequelize } = require('sequelize');
const { applyAdditionalSetup } = require('./additional-setup');

const sequelize = new Sequelize({
  dialect: 'postgres',
  user: 'christophertulin',
  database: 'sdc',
  password: 'test',
  port: 5432,
  host: 'localhost'
});

const models = [
  require('./photos'),
  //add other url model here
];

for (let modelDefiner of models) {
  modelDefiner(sequelize);
}

//for additional relationships
// applyAdditionalSetup(sequelize);

module.exports = sequelize;


///will break out urls from rest Photos table bc photos to urls is a 1:M relationship