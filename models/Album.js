const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  runDate: { type: Number, required: true, unique: true },
  albumIndex: { type: Number, required: true, unique: true },
});

module.exports = Album = mongoose.model("album", albumSchema);
