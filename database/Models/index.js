const { Sequelize } = require('sequelize');
const { applyAdditionalSetup } = require('./additional-setup');
const dotenv = require('dotenv');

const sequelize = new Sequelize('postgres://postgres:postgres@localhost/sdc', {
  dialect: 'postgres',
  user: process.env.POSTGRES_USER,
  database: 'sdc',
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.PORT,
  host: process.env.POSTGRES_HOST,
  logging: false
});

const models = [
  require('./photos'),
  require('./rooms')
];

for (let modelDefiner of models) {
  modelDefiner(sequelize);
}

applyAdditionalSetup(sequelize);

module.exports = sequelize;