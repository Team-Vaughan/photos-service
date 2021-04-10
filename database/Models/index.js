const { Sequelize } = require('sequelize');
const { applyAdditionalSetup } = require('./additional-setup');
const dotenv = require('dotenv').config();

const sequelize = new Sequelize('sdc', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  dialect: 'postgres',
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