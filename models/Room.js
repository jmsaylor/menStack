const mongoose = require("mongoose");
const { reservationSchema } = require("./Reservation");

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
  reservations: [reservationSchema]
});

const Room = mongoose.model("Room", roomSchema);

exports.roomSchema = roomSchema;
exports.Room = Room;
