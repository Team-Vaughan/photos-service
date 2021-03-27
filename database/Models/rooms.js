const { DataTypes } = require('sequelize');

module.exports = sequelize => {

  return sequelize.define('rooms', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    room_number: {
      primaryKey: true,
      type: DataTypes.INTEGER
    }
  });

};