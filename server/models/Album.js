const mongoose = require('mongoose');
const { Schema } = mongoose ;

const albumSchema = new Schema({
  albumId: {
    type: String,
    required: true,
  },
  artists: {
      type: String,
      required: true,
      trim: true,
  },
  artistId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  image: {
    type: String,
  },
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;