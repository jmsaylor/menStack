const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  }
});

const Reservation = mongoose.model("Reservation", reservationSchema);

exports.reservationSchema = reservationSchema;
