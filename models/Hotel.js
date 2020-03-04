const mongoose = require("mongoose");
const { roomSchema } = require("./Room");

module.exports = mongoose.model("Hotel", new Schema({
  name: {
    type: String,
    unique: true
  },
  location: {
    address: { type: String },
    zip: { type: Number }
  },
  rooms: [roomSchema]
});

