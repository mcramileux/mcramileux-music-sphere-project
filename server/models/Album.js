// const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const albumSchema = new Schema({
  albumId: {
    type: String,
    required: true,
  },
  artist: {
      type: String,
      required: true,
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

// const Album = mongoose.model('Album', albumSchema);

module.exports = albumSchema;