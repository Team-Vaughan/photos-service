const { Sequelize } = require('sequelize');
const { applyAdditionalSetup } = require('./additional-setup');

const sequelize = new Sequelize({
  dialect: 'postgres',
  user: 'christophertulin',
  database: 'sdc',
  password: 'test',
  port: 5432,
  host: 'localhost',
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