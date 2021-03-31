const applyAdditionalSetup = (sequelize) => {
  const { photos, rooms } = sequelize.models;
  rooms.hasMany(photos);
  photos.belongsTo(rooms);
};

module.exports = { applyAdditionalSetup };