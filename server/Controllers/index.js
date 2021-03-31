const db = require('../../database');

const getRoomPhotosByNumber = async (req, res) => {
  const { id } = req.params;

  db.getPhotosByRoomId(id);

  // const photos = await models.rooms.findByPk(id);
}

module.exports = {
  getRoomPhotosByNumber
}