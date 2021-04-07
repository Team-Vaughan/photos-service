require('newrelic');
const app = require('./app');
const PORT = process.env.PORT || 5005;
const sequelize = require('../database/Models');

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log('server started at port: ', PORT);
  });
});