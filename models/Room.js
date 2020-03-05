const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  room: {
    type: String
  },
  roomType: {
    type: String
  },
  roomPrice: {
    type: Number
  },
  available: {
    type: Boolean
  }
});

const Room = mongoose.model("Room", roomSchema);

exports.roomSchema = roomSchema;
exports.Room = Room;
