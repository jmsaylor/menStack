const mongoose = require("mongoose");
const { roomSchema } = require("./Room");

module.exports = mongoose.model(
  "Hotel",
  new mongoose.Schema({
    name: {
      type: String
    },
    location: {
      type: String
    },
    rooms: [roomSchema]
  })
);
