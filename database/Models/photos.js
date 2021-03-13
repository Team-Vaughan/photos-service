const { DataTypes } = require('sequelize');

module.exports = sequelize => {

  return sequelize.define('photos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    caption: DataTypes.STRING,
    is_primary: DataTypes.BOOLEAN,
    storage_url: DataTypes.STRING
  });

};