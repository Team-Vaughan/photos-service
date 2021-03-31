const db = require('../../database');

const getRoomPhotosByNumber = async (req, res) => {
  const { id } = req.params;

  try {
    const photos = await db.getPhotosByRoomId(id);
    const response = [];
    photos.forEach((photo, i) => {
      response.push(photo.dataValues);
    });

    res.status(200).json(response);

  } catch(e) {
    res.status(500).send(e);
  }

}

module.exports = {
  getRoomPhotosByNumber
}