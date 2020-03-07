const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Hotel = require("../../models/Hotel");

router.get("/", async (req, res) => {
  try {
    let hotelRooms = await Hotel.find();
    res.send(hotelRooms);
  } catch (error) {
    console.error(error);
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    let hotel = new Hotel({
      name: req.body.name,
      location: req.body.location,
      rooms: [
        {
          roomNumber: req.body.room,
          roomType: req.body.roomType,
          roomPrice: req.body.roomPrice,
          available: req.body.available
        }
      ]
    });

    hotel = await hotel.save();
    res.send(hotel);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
