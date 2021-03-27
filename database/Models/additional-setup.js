const applyAdditionalSetup = (sequelize) => {
  const { photos, rooms } = sequelize.models;
  rooms.hasMany(photos);
};

module.exports = { applyAdditionalSetup };