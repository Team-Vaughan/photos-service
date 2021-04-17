const { Sequelize } = require('sequelize');
const { applyAdditionalSetup } = require('./additional-setup');
const dotenv = require('dotenv').config();

const sequelize = new Sequelize('sdc', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  dialect: 'postgres',
  port: process.env.PORT,
  host: process.env.POSTGRES_HOST,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
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