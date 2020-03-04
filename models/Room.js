const mongoose = require("mongoose");

const roomSchema = new Schema({
  roomNumber: {
    type: Number,
    required: true,
    unique: true
  },
  roomType: {
    type: String
  },
  roomPrice: {
    type: Number
  }
});

const Room = mongoose.model("Room", roomSchema);

exports.roomSchema = roomSchema;
exports.Room = Room;
